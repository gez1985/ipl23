import Helpers from "./Helpers";
import sortObjects from "./SortObjects";

const ManagerProps = {};

ManagerProps.getManagerProperties = (managers, players) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  managers.forEach((manager) => {
    manager.topScorer = "";
    manager.topScorerPoints = 0;
    const managersTotalPointsArray = [];
    const managersRunsArray = [];
    const managersFoursArray = [];
    const managersSixesArray = [];
    const managersCatchesArray = [];
    const managersPartRunOutsArray = [];
    const managersFullRunOutsArray = [];
    const managersStumpingsArray = [];
    const managersOversArray = [];
    const managersRunsConcededArray = [];
    const managersWicketsArray = [];
    const managersMaidensArray = [];
    const managersDotBallsArray = [];
    const managersAppearancesArray = [];
    if (manager.stage1Squad) {
      manager.stage1Squad.forEach((playerId) => {
        const player = Helpers.getObjectById(players, playerId);
        managersTotalPointsArray.push(player.totalPoints);
        managersRunsArray.push(player.runs);
        managersFoursArray.push(player.fours);
        managersSixesArray.push(player.sixes);
        managersCatchesArray.push(player.catches);
        managersPartRunOutsArray.push(player.partRunOuts);
        managersFullRunOutsArray.push(player.fullRunOuts);
        managersStumpingsArray.push(player.stumpings);
        managersOversArray.push(player.overs);
        managersRunsConcededArray.push(player.runsConceded);
        managersWicketsArray.push(player.wickets);
        managersMaidensArray.push(player.maidens);
        managersAppearancesArray.push(player.appearances);
        managersDotBallsArray.push(player.dotBalls);
        if (player.totalPoints > manager.topScorerPoints) {
          manager.topScorerPoints = player.totalPoints;
          manager.topScorer = player.name;
        }
      });
    }
    manager.totalPoints = managersTotalPointsArray.reduce(reducer, 0);
    manager.runs = managersRunsArray.reduce(reducer, 0);
    manager.fours = managersFoursArray.reduce(reducer, 0);
    manager.sixes = managersSixesArray.reduce(reducer, 0);
    manager.catches = managersCatchesArray.reduce(reducer, 0);
    manager.partRunOuts = managersPartRunOutsArray.reduce(reducer, 0);
    manager.fullRunOuts = managersFullRunOutsArray.reduce(reducer, 0);
    manager.stumpings = managersStumpingsArray.reduce(reducer, 0);
    manager.overs = managersOversArray.reduce(reducer, 0);
    manager.runsConceded = managersRunsConcededArray.reduce(reducer, 0);
    manager.wickets = managersWicketsArray.reduce(reducer, 0);
    manager.maidens = managersMaidensArray.reduce(reducer, 0);
    manager.appearances = managersAppearancesArray.reduce(reducer, 0);
    manager.dotBalls = managersDotBallsArray.reduce(reducer, 0);
  });
};

ManagerProps.getStagePoints = (managers, players) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  managers.forEach((manager) => {
    manager.stage1BestEleven = ManagerProps.getBestEleven(manager, players, 1);
    // manager.stage2BestEleven = ManagerProps.getBestEleven(manager, players, 2);
    // manager.stage3BestEleven = ManagerProps.getBestEleven(manager, players, 3);
    const stage1TotalPointsArray = [];
    const stage2TotalPointsArray = [];
    const stage3TotalPointsArray = [];
    if (manager.stage1BestEleven) {
      manager.stage1BestEleven.forEach((playerId) => {
        const player = Helpers.getObjectById(players, playerId);
        stage1TotalPointsArray.push(player.totalPoints);
      });
    }
    if (manager.stage2Squad) {
      manager.stage2Squad.forEach((playerId) => {
        const player = Helpers.getObjectById(players, playerId);
        stage2TotalPointsArray.push(player.stage2Points);
      });
    }
    if (manager.stage3Squad) {
      manager.stage3Squad.forEach((playerId) => {
        const player = Helpers.getObjectById(players, playerId);
        stage3TotalPointsArray.push(player.stage3Points);
      });
    }
    manager.stage1Points = stage1TotalPointsArray.reduce(reducer, 0);
    manager.stage2Points = stage2TotalPointsArray.reduce(reducer, 0);
    manager.stage3Points = stage3TotalPointsArray.reduce(reducer, 0);
  });
};

ManagerProps.getBestEleven = (manager, players, stage) => {
  let squad;
  switch (stage) {
    case 2:
      squad = "stage2Squad";
      break;
    case 3:
      squad = "stage3Squad";
      break;
    default:
      squad = "stage1Squad";
  }
  if (manager[squad].length <= 14) {
    return manager[squad];
  } else {
    const managerPlayers = manager[squad].map((playerId) =>
      Helpers.getObjectById(players, playerId)
    );
    const bestEleven = [];
    const managerBatters = managerPlayers.filter(
      (player) => player.role === "BT"
    );
    const managerAllRounders = managerPlayers.filter(
      (player) => player.role === "AR"
    );
    const managerWicketkeepers = managerPlayers.filter(
      (player) => player.role === "WK"
    );
    const managerBowlers = managerPlayers.filter(
      (player) => player.role === "BW"
    );
    sortObjects(managerBatters, "totalPoints");
    sortObjects(managerAllRounders, "totalPoints");
    sortObjects(managerWicketkeepers, "totalPoints");
    sortObjects(managerBowlers, "totalPoints");
    bestEleven.push(managerBatters[0], managerBatters[1], managerBatters[2]);
    bestEleven.push(managerBowlers[0], managerBowlers[1], managerBowlers[2]);
    bestEleven.push(managerAllRounders[0]);
    bestEleven.push(managerWicketkeepers[0]);
    const remainingPlayers = managerPlayers.filter(
      (player) => !bestEleven.includes(player)
    );
    sortObjects(remainingPlayers, "totalPoints");
    remainingPlayers.forEach((player) => {
      if (bestEleven.length < 11) {
        const teamRoleArray = bestEleven.map((player) => player.role);
        teamRoleArray.push(player.role);
        let count = {};
        teamRoleArray.forEach(function (i) {
          count[i] = (count[i] || 0) + 1;
        });
        if (player.role === "BT" && count.BT <= 5) {
          bestEleven.push(player);
        }
        if (player.role === "AR" && count.AR <= 3) {
          bestEleven.push(player);
        }
        if (player.role === "WK" && count.WK <= 2) {
          bestEleven.push(player);
        }
        if (player.role === "BW" && count.BW <= 5) {
          bestEleven.push(player);
        }
      }
    });
    const bestElevenIds = bestEleven.map((player) => player.id);
    return bestElevenIds;
  }
};

export default ManagerProps;
