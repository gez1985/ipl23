import Search from "../utils/search";
import Helpers from "../utils/Helpers";
import DraftValidation from "./DraftValidation";

const autoPick = (league, manager, managers, players) => {
  let chosenPlayer;
  const managerCopy = JSON.parse(JSON.stringify(manager));
  if (checkSquadSpace(league, manager)) {
    const availablePlayers = Helpers.getUnpickedPlayers(
      managers,
      players,
      league
    );
    const availablePlayerIds = availablePlayers.map((player) => player.id);
    for (let i = 0; i < manager.shortlist.length; i++) {
      const player = players.find(
        (player) => manager.shortlist[i] === player.id
      );
      if (!availablePlayerIds.includes(manager.shortlist[i])) {
        removePlayerIdFromShortlist(managerCopy, manager.shortlist[i]);
      } else {
        const playerValid = checkPlayerValid(league, manager, players, player);
        if (playerValid) {
          const minReqCheck = checkMinReq(manager, players, player);
          if (minReqCheck) {
            if (!chosenPlayer) {
              chosenPlayer = player;
              removePlayerIdFromShortlist(managerCopy, manager.shortlist[i]);
            }
          }
        } else {
          removePlayerIdFromShortlist(managerCopy, manager.shortlist[i]);
        }
      }
    }
    while (!chosenPlayer) {
      chosenPlayer = getRandomPlayer(
        league,
        manager,
        players,
        availablePlayers
      );
    }
    console.log(`the chosen player is ${chosenPlayer.name}`);
    managerCopy.stage1Squad.push(chosenPlayer.id);
    // try {
    //   await Search.putManager(managerCopy);
    //   await updateVidi(league.id, manager.id, chosenPlayer.id);
    // } catch (err) {
    //   console.log(err);
    // }
  }
  // await updateLeague(league);
  return { player: chosenPlayer, managerCopy };
};

const checkMinReq = (manager, players, player) => {
  if (!manager.minReqFirst) {
    return true;
  } else {
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
    if (player.role === "WK" && count === 0) {
      return true;
    } else if (player.role === "AR" && count < 2) {
      return true;
    } else if (player.role === "BT" && count < 3) {
      return true;
    } else if (player.role === "BW" && count < 3) {
      return true;
    }
    const minFilled = checkMinReqFilled(teamRoleArray);
    if (minFilled) {
      return true;
    }
    console.log(`checking ${player.name} for min req with role ${player.role}`);
    return false;
  }
};

const checkMinReqFilled = (teamRoleArray) => {
  var count = {};
  teamRoleArray.forEach(function (i) {
    count[i] = (count[i] || 0) + 1;
  });
  if (count.WK >= 1 && count.AR >= 2 && count.BT >= 3 && count.BW >= 3) {
    return true;
  }
  return false;
};

const removePlayerIdFromShortlist = (manager, playerId) => {
  const index = manager.shortlist.indexOf(playerId);
  if (index > -1) {
    manager.shortlist.splice(index, 1);
  }
};

const checkSquadSpace = (league, manager) => {
  if (league.draft1Live && manager.stage1Squad.length >= 13) {
    return false;
  } else {
    return true;
  }
};

const checkPlayerValid = (league, manager, players, player) => {
  if (!DraftValidation.minTeamRequirements(league, manager, players, player)) {
    return false;
  } else if (
    !DraftValidation.maxFromEachTeam(manager, players, player)
  ) {
    return false;
  } else if (
    !DraftValidation.roleValidation(league, manager, players, player)
  ) {
    return false;
  } else {
    return true;
  }
};

const getRandomPlayer = (league, manager, players, availablePlayers) => {
  console.log("choosing random player...");
  const randomIndex = Math.floor(Math.random() * availablePlayers.length);
  const selectedPlayer = availablePlayers[randomIndex];
  const playerValid = checkPlayerValid(
    league,
    manager,
    players,
    selectedPlayer
  );
  if (playerValid) {
    return selectedPlayer;
  }
};

const updateVidi = async (leagueId, managerId, playerId) => {
  const vidiEntry = {
    leagueId: leagueId,
    managerId: managerId,
    playerId: playerId,
  };
  try {
    await Search.postVidiprinter(vidiEntry);
  } catch (err) {
    console.log(err.message);
  }
};

const updateLeague = async (league) => {
  const leagueCopy = JSON.parse(JSON.stringify(league));
  let maxPickNumber = 0;
  if (league.draft1Live) {
    maxPickNumber = league.managerIds.length;
  }
  if (league.draft1Live) {
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
  try {
    await Search.putLeague(leagueCopy);
  } catch (err) {
    console.log(err);
  }
};

export default autoPick;
