import React, { useState, useEffect } from "react";
import PlayersPageHeaders from "./PlayersPageHeaders";
import Players from "./Players";
import ShortlistModal from "./ShortlistModal";

export default function PlayersPage() {
  const [showShortlist, setShowShortlist] = useState(false);
  const [shortlistPlayer, setShortlistPlayer] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShortlistClick = (player) => {
    console.log(`short list clicked for ${player.name}`);
    setShowShortlist(true);
    setShortlistPlayer(player);
  };

  return (
    <div className={showShortlist ? "overflow-hidden" : ""}>
      {showShortlist && shortlistPlayer && (
        <ShortlistModal
          closeModal={() => setShowShortlist(false)}
          player={shortlistPlayer}
        />
      )}
      <PlayersPageHeaders />
      <Players
        handleShortlistClick={handleShortlistClick}
        showShortlist={showShortlist}
      />
    </div>
  );
}
