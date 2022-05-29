import Helpers from "../../utils/Helpers";

const PickValidation = {};

// PickValidation.minTeamRequirements = (player, players, manager) => {
//   let myTeam = [];
//   manager.stage3Squad.forEach((playerId) => {
//     myTeam.push(Helpers.getObjectById(players, playerId));
//   });
//   const teamRoleArray = myTeam.map((player) => player.role);
//   teamRoleArray.push(player.role);
//   let needed = 7;
//   let picksLeft = 12 - teamRoleArray.length;
//   var count = {};
//   teamRoleArray.forEach(function (i) {
//     count[i] = (count[i] || 0) + 1;
//   });
//   if (count.BT < 2) {
//     needed = needed - count.BT;
//   } else {
//     needed = needed - 2;
//   }
//   if (count.AR < 1) {
//     needed = needed - count.AR;
//   } else {
//     needed = needed - 1;
//   }
//   if (count.BW < 2) {
//     needed = needed - count.BW;
//   } else {
//     needed = needed - 2;
//   }
//   if (needed > picksLeft) {
//     return false;
//   } else {
//     return true;
//   }
// };

PickValidation.roleValidation = (player, players, manager) => {
  let count = 0;
  let myTeam = [];
  manager.stage3Squad.forEach((playerId) => {
    myTeam.push(Helpers.getObjectById(players, playerId));
  });
  const teamRoleArray = myTeam.map((player) => player.role);
  teamRoleArray.forEach((role) => {
    if (role === player.role) {
      count++;
    }
  });
  let batBowMax = 5;
  let arMax = 4;
  let wkMax = 3;
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

export default PickValidation;
