const express = require("express");
const pool = require("../db");
const camelcaseKeys = require("camelcase-keys");
const { LeagueManagersContext } = require("../client/src/Store");

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
    await autoPickPlayer(league, nextManager, managers, players);
    const updatedLeague = await updateLeague(league);
    await autoPick(managers, updatedLeague, players);
  } 
}

async function getUpdatedManagers(leagueId) {
  const leagueManagers = await pool.query(`SELECT * FROM managers WHERE league_id = ${leagueId}`);
  return leagueManagersContext.rows;
}

async function autoPickPlayer(league, manager, managers, players) {
  const updatedManagers = getUpdatedManagers(league.id);
  console.log(updatedManagers);
  const managerCopy = JSON.parse(JSON.stringify(manager));
  const unpickedPlayers = getUnpickedPlayers(managers, players, league);
  const unpickedPlayerIds = unpickedPlayers.map((player) => player.id);
  let chosenPlayerId;
  for (let i = 0; i < manager.shortlist.length; i++) {
    if (unpickedPlayerIds.includes(manager.shortlist[i])) {
      console.log(`player with id = ${manager.shortlist[i]} is available`);
      if (!chosenPlayerId) {
        chosenPlayerId = manager.shortlist[i];
      }
    } else {
      console.log(`player with id = ${manager.shortlist[i]} has already been selected`);
    }
    console.log(chosenPlayerId);
  }
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
