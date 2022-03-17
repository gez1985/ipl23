import Search from "../utils/search";
import Helpers from "../utils/Helpers";
import DraftValidation from "./DraftValidation";

const autoPick = async (league, manager, managers, players) => {
  console.log("I am the auto picking function");
  if (checkSquadSpace(league, manager)) {
    const managerCopy = JSON.parse(JSON.stringify(manager));
    const availablePlayers = Helpers.getUnpickedPlayers(
      managers,
      players,
      league
    );
    console.log(availablePlayers);
    const availablePlayerIds = availablePlayers.map((player) => player.id);
    let chosenPlayer;
    for (let i = 0; i < manager.shortlist.length; i++) {
      const player = players.find(
        (player) => manager.shortlist[i] === player.id
      );
      console.log(`this is ${player.name} with id = ${player.id}`);
      if (!availablePlayerIds.includes(manager.shortlist[i])) {
        console.log(`${player.name} has already been selected`);
        removePlayerIdFromShortlist(managerCopy, manager.shortlist[i]);
      } else {
        const playerValid = checkPlayerValid(league, manager, players, player);
        if (playerValid) {
          console.log(`${player.name} is a valid pick`);
          if (!chosenPlayer) {
            chosenPlayer = player;
            removePlayerIdFromShortlist(managerCopy, manager.shortlist[i]);
          }
        } else {
          console.log(`${player.name} is an invalid pick`);
          removePlayerIdFromShortlist(managerCopy, manager.shortlist[i]);
        }
      }
    }
    while (!chosenPlayer) {
      chosenPlayer = getRandomPlayer(league, manager, players, availablePlayers);
    } 
    console.log(`the chosen player is ${chosenPlayer.name}`);
    updateAutoManager(league, managerCopy, chosenPlayer.id);
    console.log(managerCopy);
    try {
      await Search.putManager(managerCopy);
    } catch (err) {
      console.log(err);
    }
  }
  await updateLeague(league);
};

const removePlayerIdFromShortlist = (manager, playerId) => {
  console.log(manager);
  console.log(playerId)
  const index = manager.shortlist.indexOf(playerId);
  console.log(index);
  if (index > -1) {
    manager.shortlist.splice(index, 1);
  }
};

const checkSquadSpace = (league, manager) => {
  if (league.draft1Live && manager.stage1Squad.length >= 15) {
    return false;
  } else if (league.draft2Live && manager.stage2Squad >= 11) {
    return false;
  } else if (league.draft3Live && manager.stage3Squad >= 11) {
    return false;
  } else {
    return true;
  }
};

const checkPlayerValid = (league, manager, players, player) => {
  if (!DraftValidation.minTeamRequirements(league, manager, players, player)) {
    return false;
  } else if (
    !DraftValidation.maxFromEachTeam(league, manager, players, player)
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

const updateAutoManager = (league, manager, playerId) => {
  if (league.draft1Live) {
    manager.stage1Squad.push(playerId);
  } else if (league.draft2Live) {
    manager.stage2Squad.push(playerId);
  } else if (league.draft3Live) {
    manager.stage3Squad.push(playerId);
  } else {
    return;
  }
}

const getRandomPlayer = (league, manager, players, availablePlayers) => {
  console.log('random player required');
  const randomIndex = Math.floor(Math.random() * availablePlayers.length);
  const selectedPlayer = availablePlayers[randomIndex];
  const playerValid = checkPlayerValid(league, manager, players, selectedPlayer);
  if (playerValid) {
    return selectedPlayer;
  }
}

const updateLeague = async (league) => {
  const stage2Managers = league.stage2Managers.flat();
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
  try {
    await Search.putLeague(leagueCopy);
  } catch (err) {
    console.log(err);
  }
};

export default autoPick;
