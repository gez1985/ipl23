import PickValidation from "./utils/FinalDrawValidation";

const pickFinalPlayer = (manager, managers, players) => {
  if (manager.stage3Squad.length >= 12) {
    return;
  }
  const availablePlayers = getUnpickedPlayers(managers, players);
  const availablePlayerIds = availablePlayers.map((player) => player.id);
  let chosenPlayer;
  for (let i = 0; i < manager.stage3Shortlist.length; i++) {
    const playerId = manager.stage3Shortlist[i];
    if (availablePlayerIds.includes(playerId)) {
      const player = players.find((player) => playerId === player.id);
      console.log(`${player.name} is available to select`);
      if (validPick(player, players, manager)) {
        chosenPlayer = playerId;
        break;
      } else {
        console.log(`${player.name} is not a valid pick`);
      }
    }
  }
  if (!chosenPlayer) {
    console.log("no short listed players available, selecting a random player");
    chosenPlayer = getRandomPlayer(manager, availablePlayers, players);
  }
  console.log(`chosen player has id ${chosenPlayer}`);
  manager.stage3Squad.push(chosenPlayer);
};

const getUnpickedPlayers = (managers, players) => {
  const pickedPlayerIds = [];
  managers.forEach((manager) => {
    pickedPlayerIds.push(...manager.stage3Squad);
  });
  const unpickedPlayers = players.filter(
    (player) => !pickedPlayerIds.includes(player.id)
  );
  return unpickedPlayers;
};

const validPick = (player, players, manager) => {
  // const minRequirements = PickValidation.minTeamRequirements(
  //   player,
  //   players,
  //   manager
  // );
  const roleValidation = PickValidation.roleValidation(
    player,
    players,
    manager
  );
  console.log(`role validation = ${roleValidation}`);
  if (!roleValidation) {
    return false;
  }
  return true;
};

const getRandomPlayer = (manager, availablePlayers, players) => {
  const playersCopy = JSON.parse(JSON.stringify(availablePlayers));
  let selectedPlayer;
  while (!selectedPlayer) {
    const randomPlayer =
      playersCopy[Math.floor(Math.random() * playersCopy.length)];
      console.log(`random player is ${randomPlayer.name}`);
    if (validPick(randomPlayer, players, manager)) {
      console.log(`${randomPlayer.name} is a valid pick`);
      selectedPlayer = randomPlayer;
    } else {
      console.log(`${randomPlayer.name} is NOT a valid pick`);
      const index = playersCopy.indexOf(randomPlayer);
      if (index > -1) {
        playersCopy.splice(index, 1);
      }
    }
  }
  return selectedPlayer.id
};

export { pickFinalPlayer };
