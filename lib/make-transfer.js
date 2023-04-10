const pool = require("../db");
const camelCaseKeys = require("camelcase-keys");
const Helpers = require("./helpers");

module.exports = makeTransfer = async (manager) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chosenPlayer;
      const managerCopy = JSON.parse(JSON.stringify(manager));
      removeTransferredPlayer(managerCopy);
      const managersResponse = await pool.query("SELECT * FROM managers");
      const playersResponse = await pool.query("SELECT * FROM players");
      const managers = managersResponse.rows.map((manager) =>
        camelCaseKeys(manager)
      );
      const players = playersResponse.rows.map((player) =>
        camelCaseKeys(player)
      );
      const transferredPlayer = players.find(
        (player) => managerCopy.transferOutId === player.id
      );
      console.log(
        `${managerCopy.name} is transferring ${transferredPlayer.name}`
      );
      const availablePlayers = getAvailablePlayers(managers, players);
      const availablePlayerIds = availablePlayers.map((player) => player.id);
      for (let i = 0; i < managerCopy.transfers.length; i++) {
        const player = players.find(
          (player) => managerCopy.transfers[i] === player.id
        );
        if (availablePlayerIds.includes(managerCopy.transfers[i])) {
          const playerValid = checkPlayerValid(managerCopy, players, player);
          if (playerValid) {
            if (!chosenPlayer) {
              chosenPlayer = player;
            }
          } else {
            console.log(
              `${player.name} has failed validation for ${managerCopy.name}`
            );
          }
        }
      }
      if (chosenPlayer) {
        managerCopy.stage1Squad.push(chosenPlayer.id);
        await updateTransferHistory(
          managerCopy.id,
          managerCopy.transferOutId,
          chosenPlayer.id
        );
        await updateManager(managerCopy);
        resolve(`${managerCopy.name} has selected ${chosenPlayer.name}`);
      } else {
        managerCopy.stage1Squad.push(manager.transferOutId);
        await updateManager(managerCopy);
        resolve(`${managerCopy.name} has no valid players available`);
      }
    } catch (error) {
      console.log(error.message);
      reject("an error occurred");
    }
  });
};

const updateTransferHistory = async (
  managerId,
  playerOutId,
  playerInId,
  leagueId = 1
) => {
  try {
    const sql =
      "INSERT INTO transfers (manager_id, player_out_id, player_in_id, league_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [managerId, playerOutId, playerInId, leagueId];
    await pool.query(sql, values);
  } catch (error) {
    console.log(error.message);
  }
};

const updateManager = async (managerCopy) => {
  console.log(`updating ${managerCopy.name} on the database`);
  managerCopy.transferOutId = -1;
  managerCopy.transfers = [];
  const {
    name,
    teamName,
    userId,
    adminLevel,
    stage1Squad,
    stage2Squad,
    stage3Squad,
    autoPick,
    transfers,
    transferOutId,
    shortlist,
    stage2Shortlist,
    stage3Shortlist,
    minReqFirst,
    id,
  } = managerCopy;
  try {
    const sql =
      "UPDATE managers SET name = $1, team_name = $2, user_id = $3, admin_level = $4, stage_1_squad = $5, stage_2_squad = $6, stage_3_squad = $7, auto_pick = $8, transfers = $9, transfer_out_id = $10, shortlist = $11, stage_2_shortlist = $12, stage_3_shortlist = $13, min_req_first = $14 WHERE id = $15 RETURNING *";
    const values = [
      name,
      teamName,
      userId,
      adminLevel,
      stage1Squad,
      stage2Squad,
      stage3Squad,
      autoPick,
      transfers,
      transferOutId,
      shortlist,
      stage2Shortlist,
      stage3Shortlist,
      minReqFirst,
      id,
    ];
    await pool.query(sql, values);
  } catch (error) {
    console.log(error.message);
  }
};

const removeTransferredPlayer = async (manager) => {
  const index = manager.stage1Squad.indexOf(manager.transferOutId);
  if (index > -1) {
    // only splice array when item is found
    manager.stage1Squad.splice(index, 1); // 2nd parameter means remove one item only
  }
  // manager.transferOutId = -1;
};

const getAvailablePlayers = (managers, players) => {
  const pickedPlayerIds = [];
  managers.forEach((manager) => {
    pickedPlayerIds.push(...manager.stage1Squad);
  });
  const availablePlayers = players.filter(
    (player) => !pickedPlayerIds.includes(player.id)
  );
  return availablePlayers;
};

const checkPlayerValid = (manager, players, player) => {
  if (!minTeamRequirements(manager, players, player)) {
    return false;
  } else if (!maxFromEachTeam(manager, players, player)) {
    return false;
  } else if (!roleValidation(manager, players, player)) {
    return false;
  } else {
    return true;
  }
};

const maxFromEachTeam = (manager, players, player) => {
  const max = 3;
  let count = 0;
  const myTeam = [];
  manager.stage1Squad.forEach((playerId) => {
    myTeam.push(Helpers.getObjectById(players, playerId));
  });
  const teamIdArray = myTeam.map((player) => player.teamId);
  teamIdArray.forEach((id) => {
    if (id === player.teamId) {
      count++;
    }
  });
  if (count >= max) {
    return false;
  } else {
    return true;
  }
};

const minTeamRequirements = (manager, players, player) => {
  let myTeam = [];
  manager.stage1Squad.forEach((playerId) => {
    myTeam.push(Helpers.getObjectById(players, playerId));
  });
  const teamRoleArray = myTeam.map((player) => player.role);
  teamRoleArray.push(player.role);
  var count = {};
  teamRoleArray.forEach(function (i) {
    count[i] = (count[i] || 0) + 1;
  });
  if (count.WK < 1) {
    return false;
  }
  if (count.BT < 3) {
    return false;
  }
  if (count.AR < 2) {
    return false;
  }
  if (count.BW < 3) {
    return false;
  }
  return true;
};

const roleValidation = (manager, players, player) => {
  let count = 0;
  let myTeam = [];
  manager.stage1Squad.forEach((playerId) => {
    myTeam.push(Helpers.getObjectById(players, playerId));
  });
  const teamRoleArray = myTeam.map((player) => player.role);
  teamRoleArray.forEach((role) => {
    if (role === player.role) {
      count++;
    }
  });
  const batBowMax = 6;
  const arMax = 4;
  const wkMax = 2;
  if (player.role === "WK" && count >= wkMax) {
    return false;
  } else if (player.role === "BT" && count >= batBowMax) {
    return false;
  } else if (player.role === "BW" && count >= batBowMax) {
    return false;
  } else if (player.role === "AR" && count >= arMax) {
    return false;
  } else {
    return true;
  }
};
