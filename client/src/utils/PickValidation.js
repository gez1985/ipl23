const PickValidation = (league, manager, selectedPlayer) => {
  if (league.draft1Live) {
    if (manager.stage1Squad.includes(selectedPlayer.id)) {
      return false;
    }
  }
  return true;
};

export default PickValidation;