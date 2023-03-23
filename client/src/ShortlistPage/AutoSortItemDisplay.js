import React from "react";

const AutoSortItemDisplay = ({ player, chooseClick, listed }) => {
  if (!player) {
    return null;
  }

  return <div onClick={() => chooseClick(listed)}>{player.name}</div>;
};

export default AutoSortItemDisplay;
