const sortObjectsArray = require("sort-objects-array");

const Helpers = {};

Helpers.getObjectById = (array, id) => {
  const found = array.find((element) => element.id === Number(id));
  return found;
};

Helpers.getNameById = (array, id) => {
  const found = array.find((element) => element.id === Number(id));
  if (found) {
    return found.name;
  } else {
    return;
  }
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
  leagues.forEach((league) => {
    if (league.managerIds.includes(managerId)) {
      leagueToReturn = league;
    }
  });
  return leagueToReturn;
};

Helpers.setManagersByLeague = (league, managers) => {
  const leagueManagers = [];
  league.managerIds.forEach((managerId) => {
    leagueManagers.push(Helpers.getObjectById(managers, managerId));
  });
  leagueManagers.forEach((manager) => {
    const pickIndex = league.managerIds.findIndex(
      (managerId) => managerId === manager.id
    );
    manager.pickNumber = pickIndex + 1;
  });
  const sortedManagers = sortObjectsArray(leagueManagers, "totalPoints", "desc");
  sortedManagers.forEach((manager, managerIndex) => {
    manager.stagePickNumber = managerIndex + 1;
  });
  const stage3Managers = league.stage3Managers.flat();
  const finalManagers = [];
  stage3Managers.forEach(managerId => {
    finalManagers.push(Helpers.getObjectById(leagueManagers, managerId));
  });
  if (finalManagers.length === 2) {
    if (finalManagers[0].stagePickNumber < finalManagers[1].stagePickNumber) {
      finalManagers[0].finalPickNumber = 1;
      finalManagers[1].finalPickNumber = 2;
    } else {
      finalManagers[0].finalPickNumber = 2;
      finalManagers[1].finalPickNumber = 1;
    }
  }
  return leagueManagers;
};

Helpers.getPlayersManager = (players, managers) => {
  managers.forEach((manager) => {
    manager.stage1Squad.forEach((playerId) => {
      const player = Helpers.getObjectById(players, playerId);
      player.manager = manager.name;
    });
  });
};

Helpers.getPlayerIdsFromTeamId = (players, teamId) => {
  const playerIds = [];
  players.forEach((player) => {
    if (player.teamId === teamId) {
      playerIds.push(player.id);
    }
  });
  return playerIds;
};

Helpers.getUnpickedPlayers = (managers, players, league) => {
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
    const qualifiedPlayers = players.filter(player => league.stage2Teams.includes(player.teamId));
    const qualifiedManagers = managers.filter(manager => stage2Managers.includes(manager.id));
    qualifiedManagers.forEach(manager => {
      pickedPlayerIds.push(...manager.stage2Squad);
    });
    const availablePlayers = qualifiedPlayers.filter(player => !pickedPlayerIds.includes(player.id));
    return availablePlayers;
  }
  if (league.draft3Live) {
    const pickedPlayerIds = [];
    const stage3Managers = league.stage3Managers.flat();
    const qualifiedPlayers = players.filter(player => league.stage3Teams.includes(player.teamId));
    const qualifiedManagers = managers.filter(manager => stage3Managers.includes(manager.id));
    qualifiedManagers.forEach(manager => {
      pickedPlayerIds.push(...manager.stage3Squad);
    });
    const availablePlayers = qualifiedPlayers.filter(player => !pickedPlayerIds.includes(player.id));
    return availablePlayers;
  }
};

Helpers.getManagerByPickNumber = (stage, managers, pickNumber) => {
  if (stage === 1) {
    const found = managers.find(
      (manager) => manager.pickNumber === Number(pickNumber)
    );
    if (found) {
      return found.name;
    }
  }
  if (stage === 2) {
    const found = managers.find(
      (manager) => manager.stagePickNumber === Number(pickNumber)
    );
    if (found) {
      return found.name;
    }
  }
  if (stage === 3) {
    const found = managers.find(
      (manager) => manager.finalPickNumber === Number(pickNumber)
    );
    if (found) {
      return found.name;
    }
  }
  return;
};

Helpers.pushQualifiedPlayers = (manager, league, players) => {
  const qualifiedPlayers = [];
  if (league.draft2Live) {
    manager.stage1Squad.forEach((playerId) => {
      const player = Helpers.getObjectById(players, playerId);
      league.stage2Teams.includes(player.teamId)
        ? qualifiedPlayers.push(player.id)
        : console.log("player not qualified");
    });
    qualifiedPlayers.forEach(playerId => {
      if (!manager.stage2Squad.includes(playerId)) {
        manager.stage2Squad.push(playerId);
      }
    });
  } else if (league.draft3Live) {
    manager.stage2Squad.forEach((playerId) => {
      const player = Helpers.getObjectById(players, playerId);
      league.stage3Teams.includes(player.teamId)
        ? qualifiedPlayers.push(player.id)
        : console.log("player not qualified");
    });
    qualifiedPlayers.forEach(playerId => {
      if (!manager.stage3Squad.includes(playerId)) {
        manager.stage3Squad.push(playerId);
      }
    });
  }
};

Helpers.getStage2Managers = (league, managers) => {
  const stage2Managers = [];
  const stage2ManagerIds = league.stage2Managers.flat();
  stage2ManagerIds.forEach(managerId => {
    stage2Managers.push(Helpers.getObjectById(managers, managerId));
  });
  return stage2Managers;
}

Helpers.getStage3Managers = (league, managers) => {
  const stage3Managers = [];
  const stage3ManagerIds = league.stage3Managers.flat();
  stage3ManagerIds.forEach(managerId => {
    stage3Managers.push(Helpers.getObjectById(managers, managerId));
  });
  return stage3Managers;
}

module.exports = Helpers;
