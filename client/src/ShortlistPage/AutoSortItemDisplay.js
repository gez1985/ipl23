import React from "react";

const AutoSortItemDisplay = ({ player, chooseClick }) => {
  if (!player) {
    return null;
  }

  return (
    <div className="shortlist-page-auto-sort-name" onClick={chooseClick}>
      {player.name}
    </div>
  );
};

export default AutoSortItemDisplay;
