import Helpers from "./utils/Helpers";

const DraftValidation = {};

DraftValidation.maxFromEachTeam = (league, manager, players, player) => {
  let max;
  let count = 0;
  const myTeam = [];
  if (league.draft1Live) {
    max = 3;
  } else if (league.draft2Live) {
    max = 4;
  } else if (league.draft3Live) {
    max = 11;
  }
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

DraftValidation.minTeamRequirements = (league, manager, players, player) => {
  let length = 0;
  let myTeam = [];
  if (league.draft1Live) {
    length = manager.stage1Squad.length;
    manager.stage1Squad.forEach((playerId) => {
      myTeam.push(Helpers.getObjectById(players, playerId));
    });
  } else if (league.draft2Live) {
    length = manager.stage2Squad.length;
    manager.stage2Squad.forEach((playerId) => {
      myTeam.push(Helpers.getObjectById(players, playerId));
    });
  } else if (league.draft3Live) {
    length = manager.stage3Squad.length;
    manager.stage3Squad.forEach((playerId) => {
      myTeam.push(Helpers.getObjectById(players, playerId));
    });
  }
  let needed = 8;
  let roundsLeft = 11 - length;
  if (league.draft1Live) {
    roundsLeft = 14 - length;
    needed = 11;
  }
  const teamRoleArray = myTeam.map((player) => player.role);
  teamRoleArray.push(player.role);
  var count = {};
  teamRoleArray.forEach(function (i) {
    count[i] = (count[i] || 0) + 1;
  });
  if (league.draft1Live) {
    if (count.WK >= 1) {
      needed = needed - 1;
    }
    if (count.BT < 4) {
      needed = needed - count.BT;
    } else if (count.BT >= 4) {
      needed = needed - 4;
    }
    if (count.AR < 2) {
      needed = needed - count.AR;
    } else if (count.AR >= 2) {
      needed = needed - 2;
    }
    if (count.BW < 4) {
      needed = needed - count.BW;
    } else if (count.BW >= 4) {
      needed = needed - 4;
    }
  } else if (league.draft2Live || league.draft3Live) {
    if (count.WK === 1) {
      needed = needed - 1;
    }
    if (count.BT < 3) {
      needed = needed - count.BT;
    } else if (count.BT >= 3) {
      needed = needed - 3;
    }
    if (count.AR < 1) {
      needed = needed - count.AR;
    } else if (count.AR >= 1) {
      needed = needed - 1;
    }
    if (count.BW < 3) {
      needed = needed - count.BW;
    } else if (count.BW >= 3) {
      needed = needed - 3;
    }
  }
  if (needed > roundsLeft) {
    return false;
  } else {
    return true;
  }
};

DraftValidation.roleValidation = (league, manager, players, player) => {
  let count = 0;
  let myTeam = [];
  if (league.draft1Live) {
    manager.stage1Squad.forEach((playerId) => {
      myTeam.push(Helpers.getObjectById(players, playerId));
    });
  } else if (league.draft2Live) {
    manager.stage2Squad.forEach((playerId) => {
      myTeam.push(Helpers.getObjectById(players, playerId));
    });
  } else if (league.draft3Live) {
    manager.stage3Squad.forEach((playerId) => {
      myTeam.push(Helpers.getObjectById(players, playerId));
    });
  }
  const teamRoleArray = myTeam.map((player) => player.role);
  teamRoleArray.forEach((role) => {
    if (role === player.role) {
      count++;
    }
  });
  let batBowMax = 5;
  let arMax = 3;
  let wkMax = 1;
  if (league.draft1Live) {
    batBowMax = 6;
    arMax = 4;
    wkMax = 2;
  }
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

DraftValidation.fullTeam = (league, manager) => {
  if (league.draft1Live) {
    if (manager.stage1Squad.length >= 15) {
      return false;
    }
  } else if (league.draft2Live) {
    if (manager.stage2Squad.length >= 11) {
      return false;
    }
  } else if (league.draft3Live) {
    if (manager.stage3Squad.length >= 11) {
      return false;
    }
  }
  return true;
};

DraftValidation.myPick = (manager, league) => {
  if (league.draft1Live) {
    if (league.pickNumber === manager.pickNumber) {
      return true;
    }
  } else if (league.draft2Live) {
    if (league.pickNumber === manager.stagePickNumber) {
      return true;
    }
  } else if (league.draft3Live) {
    if (league.pickNumber === manager.finalPickNumber) {
      return true;
    }
  }
  return false;
};

export default DraftValidation;
