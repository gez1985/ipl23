const express = require("express");
const pool = require("../db");
const camelcaseKeys = require("camelcase-keys");
const DraftValidation = require("./utils/draftValidation");

const draftRouter = express.Router();

// Make a pick:

draftRouter.put("/pick", async (req, res) => {
  try {
    const { playerId, manager, league, managers, players } = req.body;

    //  update manager database with managerCopy stage squad:

    await updateManagers(manager);

    //  update vidiprinter with details:

    await vidiEntry(league.id, manager.id, playerId);

    //  update league pick number, direction, last pick:

    const updatedLeague = await updateLeague(league);

    //  get next managers to see if autoPick (recursive function):

    await autoPick(managers, updatedLeague, players);
    res.json({ success: true, msg: "player picking completed" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, msg: "server error" });
  }
});

async function updateManagers(manager) {
  const sql = "UPDATE managers SET stage_1_squad = $1, stage_2_squad = $2, stage_3_squad = $3 WHERE id = $4 RETURNING *";
  const values = [manager.stage1Squad, manager.stage2Squad, manager.stage3Squad, manager.id];
  await pool.query(sql, values);
}

async function vidiEntry(leagueId, managerId, playerId) {
  const vidiSql =
    "INSERT INTO vidiprinter (league_id, manager_id, player_id) VALUES ($1, $2, $3) RETURNING *";
  const vidiValues = [leagueId, managerId, playerId];
  await pool.query(vidiSql, vidiValues);
}

async function updateLeague(league) {
  const leagueCopy = JSON.parse(JSON.stringify(league));
  let maxPickNumber = 0;
  if (league.draft1Live) {
    maxPickNumber = league.managerIds.length;
  }
  if (league.draft2Live) {
    maxPickNumber = stage2Managers.length;
  }
  if (league.draft1Live || league.draft2Live) {
    if (leagueCopy.lastPick) {
      leagueCopy.round++;
      leagueCopy.up = !league.up;
      leagueCopy.lastPick = false;
    } else {
      if (leagueCopy.up) {
        if (leagueCopy.pickNumber === maxPickNumber - 1) {
          leagueCopy.lastPick = true;
          leagueCopy.pickNumber++;
        } else {
          leagueCopy.pickNumber++;
        }
      } else {
        if (leagueCopy.pickNumber === 2) {
          leagueCopy.lastPick = true;
          leagueCopy.pickNumber--;
        } else {
          leagueCopy.pickNumber--;
        }
      }
    }
  }
  if (league.draft3Live) {
    if (leagueCopy.pickNumber === 1) {
      leagueCopy.pickNumber = 2;
    } else {
      leagueCopy.pickNumber = 1;
    }
  }
  const leagueSql =
    "UPDATE leagues SET round = $1, pick_number = $2, up = $3, last_pick = $4 WHERE name = $5 RETURNING *";
  const leagueValues = [
    leagueCopy.round,
    leagueCopy.pickNumber,
    leagueCopy.up,
    leagueCopy.lastPick,
    leagueCopy.name,
  ];
  const updatedLeague = await pool.query(leagueSql, leagueValues);
  return camelcaseKeys(updatedLeague.rows[0]);
}

async function autoPick(managers, league, players) {
  const nextManager = managers.find(
    (manager) => manager.pickNumber === league.pickNumber
  );
  if (nextManager.autoPick) {
    await autoPickPlayer(league, nextManager, players);
    const updatedLeague = await updateLeague(league);
    await autoPick(managers, updatedLeague, players);
  }
}

async function autoPickPlayer(league, manager, players) {
  const squadSpace = checkSquadSpace(manager, league);
  if (squadSpace) {
    const updatedManagers = await getUpdatedManagers(league.managerIds);
    const managerCopy = JSON.parse(JSON.stringify(manager));
    const unpickedPlayers = getUnpickedPlayers(
      updatedManagers,
      players,
      league
    );
    const unpickedPlayerIds = unpickedPlayers.map((player) => player.id);
    let chosenPlayer;
    for (let i = 0; i < manager.shortlist.length; i++) {
      if (unpickedPlayerIds.includes(manager.shortlist[i])) {
        const player = players.find((player) => manager.shortlist[i] === player.id);
        const playerValid = checkPlayerValid(league, manager, players, player);
        if (playerValid) {
          if (!chosenPlayer) {
            chosenPlayer = player;
            const managerCopyIndex = managerCopy.shortlist.indexOf(manager.shortlist[i]);
            if (managerCopyIndex > -1) {
              managerCopy.shortlist.splice(managerCopyIndex, 1);
            }
          }
        } else {
          const managerCopyIndex = managerCopy.shortlist.indexOf(manager.shortlist[i]);
          if (managerCopyIndex > -1) {
            managerCopy.shortlist.splice(managerCopyIndex, 1);
          }
        }
      } else {
        const managerCopyIndex = managerCopy.shortlist.indexOf(manager.shortlist[i]);
        if (managerCopyIndex > -1) {
          managerCopy.shortlist.splice(managerCopyIndex, 1);
        }
      }
      console.log(chosenPlayer);
    }
    if (!chosenPlayer) {
      chosenPlayer = getRandomPlayer(league, manager, unpickedPlayers);
    }
    updateAutoManager(league, managerCopy, chosenPlayer.id);
    await updateManagers(managerCopy);
    await vidiEntry(league.id, managerCopy.id, chosenPlayer.id);
  }
}

function updateAutoManager(league, manager, playerId) {
  if (league.draft1Live) {
    manager.stage1Squad.push(playerId)
  } else if (league.draft2Live) {
    manager.stage2Squad.push(playerId);
  } else if (league.draft3Live) {
    manager.stage3Squad.push(playerId);
  } else {
    return;
  }
}

function checkSquadSpace(manager, league) {
  if (league.draft1Live && manager.stage1Squad.length >= 15) {
    return false;
  } else if (league.draft2Live && manager.stage2Squad >= 11) {
    return false;
  } else if (league.draft3Live && manager.stage3Squad >= 11) {
    return false;
  } else {
    return true;
  }
}

function getRandomPlayer(league, manager, players) {
  let foundPlayer = false;
  let playerToReturn;
  do {
    const randomIndex = Math.floor(Math.random() * unpickedPlayerIds.length);
    const selectedPlayer = players[randomIndex];
    const playerValid = checkPlayerValid(league, manager, players, selectedPlayer);
    if (playerValid) {
      playerToReturn = selectedPlayer;
      foundPlayer = true;
    }
  } while (!foundPlayer)
  return playerToReturn;
}

function checkPlayerValid(league, manager, players, player) {
  if (!DraftValidation.minTeamRequirements(league, manager, players, player)) {
    return false;
  } else if (!DraftValidation.maxFromEachTeam(league, manager, players, player)) {
    return false;
  } else if (!DraftValidation.roleValidation(league, manager, players, player)) {
    return false;
  } else {
    return true;
  }
}

async function getUpdatedManagers(managerIds) {
  const allManagers = await pool.query("SELECT * FROM managers");
  const leagueManagers = allManagers.rows.filter((manager) =>
    managerIds.includes(manager.id)
  );
  return camelcaseKeys(leagueManagers);
}

function getUnpickedPlayers(managers, players, league) {
  if (league.draft1Live) {
    const pickedPlayerIds = [];
    managers.forEach((manager) => {
      pickedPlayerIds.push(...manager.stage1Squad);
    });
    const unpickedPlayers = players.filter(
      (player) => !pickedPlayerIds.includes(player.id)
    );
    return unpickedPlayers;
  }
  if (league.draft2Live) {
    const pickedPlayerIds = [];
    const stage2Managers = league.stage2Managers.flat();
    const qualifiedPlayers = players.filter((player) =>
      league.stage2Teams.includes(player.teamId)
    );
    const qualifiedManagers = managers.filter((manager) =>
      stage2Managers.includes(manager.id)
    );
    qualifiedManagers.forEach((manager) => {
      pickedPlayerIds.push(...manager.stage2Squad);
    });
    const availablePlayers = qualifiedPlayers.filter(
      (player) => !pickedPlayerIds.includes(player.id)
    );
    return availablePlayers;
  }
  if (league.draft3Live) {
    const pickedPlayerIds = [];
    const stage3Managers = league.stage3Managers.flat();
    const qualifiedPlayers = players.filter((player) =>
      league.stage3Teams.includes(player.teamId)
    );
    const qualifiedManagers = managers.filter((manager) =>
      stage3Managers.includes(manager.id)
    );
    qualifiedManagers.forEach((manager) => {
      pickedPlayerIds.push(...manager.stage3Squad);
    });
    const availablePlayers = qualifiedPlayers.filter(
      (player) => !pickedPlayerIds.includes(player.id)
    );
    return availablePlayers;
  }
}

module.exports = draftRouter;
