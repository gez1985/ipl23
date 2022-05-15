import PickValidation from "./utils/SemiDrawValidation";

const pickSemiPlayer = (manager, managers, players) => {
  if (manager.stage2Squad.length > 14) {
    return;
  }
  const availablePlayers = getUnpickedPlayers(managers, players);
  const availablePlayerIds = availablePlayers.map((player) => player.id);
  let chosenPlayer;
  for (let i = 0; i < manager.stage2Shortlist.length; i++) {
    const playerId = manager.stage2Shortlist[i];
    if (availablePlayerIds.includes(playerId)) {
      const player = players.find((player) => playerId === player.id);
      console.log(`${player.name} is available to select`);
      if (validPick(player, players, manager, managers)) {
        chosenPlayer = playerId;
        break;
      } else {
        console.log(`${player.name} is not a valid pick`);
      }
    }
  }
  if (!chosenPlayer) {
    console.log("no short listed players available, selecting a random player");
  }
  // if no chosen player select a random player
  console.log(`chosen player has id ${chosenPlayer}`);
};

const getUnpickedPlayers = (managers, players) => {
  const pickedPlayerIds = [];
  managers.forEach((manager) => {
    pickedPlayerIds.push(...manager.stage2Squad);
  });
  const unpickedPlayers = players.filter(
    (player) => !pickedPlayerIds.includes(player.id)
  );
  return unpickedPlayers;
};

const validPick = (player, players, manager, managers) => {
  const maxAllowed = PickValidation.maxFromEachTeam(player, players, manager);
  const minRequirements = PickValidation.minTeamRequirements(player, players, manager);
  console.log(`max allowed validation = ${maxAllowed}`);
  console.log(`min requirements validation = ${minRequirements}`);
  if (!maxAllowed || !minRequirements) {
    return false;
  }
  return true;
};

export { pickSemiPlayer };
