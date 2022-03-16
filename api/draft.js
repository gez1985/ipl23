const express = require("express");
const pool = require("../db");
const camelcaseKeys = require("camelcase-keys");

const draftRouter = express.Router();

// Make a pick:

draftRouter.put("/pick", async (req, res) => {
  try {
    const { playerId, manager, league, managers, players } = req.body;

    //  update manager database with managerCopy stage squad:

    if (league.draft1Live) {
      const sql =
        "UPDATE managers SET stage_1_squad = $1 WHERE id = $2 RETURNING *";
      const values = [manager.stage1Squad, manager.id];
      await pool.query(sql, values);
    } else if (league.draft2Live) {
      const sql =
        "UPDATE managers SET stage_3_squad = $1 WHERE id = $2 RETURNING *";
      const values = [manager.stage2Squad, manager.id];
      await pool.query(sql, values);
    } else if (league.draft3Live) {
      const sql =
        "UPDATE managers SET stage_3_squad = $1 WHERE id = $2 RETURNING *";
      const values = [manager.stage3Squad, manager.id];
      await pool.query(sql, values);
    }

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
  const updatedManagers = await getUpdatedManagers(league.managerIds);
  const managerCopy = JSON.parse(JSON.stringify(manager));
  const unpickedPlayers = getUnpickedPlayers(updatedManagers, players, league);
  const unpickedPlayerIds = unpickedPlayers.map((player) => player.id);
  let chosenPlayerId;
  for (let i = 0; i < manager.shortlist.length; i++) {
    if (unpickedPlayerIds.includes(manager.shortlist[i])) {
      const player = players.find((player) => manager.shortlist[i] === player.id);
      console.log(player);
      console.log(`${player.name} with id = ${manager.shortlist[i]} is available`);
      if (!chosenPlayerId) {
        chosenPlayerId = manager.shortlist[i];
      }
    } else {
      console.log(`player with id = ${manager.shortlist[i]} has already been selected`);
    }
    console.log(chosenPlayerId);
  }
}

function pickValidation(league, manager, players, player) {
  let full = "eleven";
    let max = "three";
    if (league.draft1Live) {
      full = "fifteen";
    }
    if (league.draft2Live) {
      max = "four";
    } else if (league.draft3Live) {
      max = "eleven";
    }
    const minTeamRequirements = DraftValidation.minTeamRequirements(
      league,
      manager,
      players,
      player
    );
    const myPick = DraftValidation.myPick(manager, league);
    const fullTeam = DraftValidation.fullTeam(league, manager);
    const maxPerTeam = DraftValidation.maxFromEachTeam(
      league,
      manager,
      players,
      player
    );
    const roleValidation = DraftValidation.roleValidation(
      league,
      manager,
      players,
      player
    );
    let batBowMax = "five";
    let arMax = "three";
    let wkMax = "one";

    //check this bit
    if (league.draft1Live) {
      batBowMax = "six";
      arMax = "four";
      wkMax = "two";
    }
    if (!fullTeam) {
      return `You already have ${full} players`;
    }
    if (!myPick) {
      return "Sorry, it is not your pick";
    }
    if (!roleValidation) {
      switch (player.role) {
        case "WK":
          return `You can only have a maximum ${wkMax} wicketkeepers.`;
        case "BT":
          return `You can only have a maximum ${batBowMax} batters`;
        case "BW":
          return `You can only have a maximum ${batBowMax} bowlers`;
        case "AR":
          return `You can only have a maximum ${arMax} all rounders`;
        default:
          return;
      }
    }
    if (!minTeamRequirements) {
      if (league.draft1Live) {
        return "You must pick a minimum of 4 batters, 4 bowlers, 2 all-rounders and 1 wicketkeeper";
      } else {
        return "You must pick a minimum of 3 batters, 3 bowlers, 1 all-rounders and 1 wicketkeeper";
      }
    }
    if (!maxPerTeam) {
      return `You can only pick ${max} players from each team`;
    }
    return "pass";
}

async function getUpdatedManagers(managerIds) {
  const allManagers = await pool.query('SELECT * FROM managers');
  const leagueManagers = allManagers.rows.filter((manager)=> managerIds.includes(manager.id));
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
