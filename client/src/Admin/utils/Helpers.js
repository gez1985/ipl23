const Helpers = {};

Helpers.getObjectById = (array, id) => {
  const found = array.find((element) => element.id === Number(id));
  return found;
};

Helpers.setManager = (managers, userId) => {
  const found = managers.find((manager) => manager.userId === userId);
  if (found) {
    return found;
  } else {
    return;
  }
};

Helpers.setLeague = (leagues, managerId) => {
  let leagueToReturn;
  leagues.forEach(league => {
    if (league.managerIds.includes(managerId)) {
      leagueToReturn = league; 
    }
  });
  if (leagueToReturn) {
    return leagueToReturn;
  } 
  return {};
};

Helpers.setManagersByLeague = (league, managers) => {
  const leagueManagers = [];
  league.managerIds.forEach(managerId => {
    leagueManagers.push(Helpers.getObjectById(managers, managerId));
  });
  return leagueManagers;
}

Helpers.getNameById = (array, id) => {
  const found = array.find((element) => element.id === id);
  if (found) {
    return found.name;
  } else {
    return;
  }
};

Helpers.getPlayerIdsFromTeamId = (players, teamId) => {
  const playerIds = [];
  players.forEach(player => {
    if (player.teamId === teamId) {
      playerIds.push(player.id);
    }
  });
  return playerIds;
}

export default Helpers;