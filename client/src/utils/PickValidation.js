const PickValidation = (league, manager, selectedPlayer) => {
  if (league.draft1Live) {
    if (manager.stage1Squad.includes(selectedPlayer.id)) {
      return false;
    }
  }
  if (league.draft2Live) {
    if (manager.stage2Squad.includes(selectedPlayer.id)) {
      return false;
    }
  }
  if (league.draft3Live) {
    if (manager.stage3Squad.includes(selectedPlayer.id)) {
      return false;
    }
  }
  return true;
};

export default PickValidation;