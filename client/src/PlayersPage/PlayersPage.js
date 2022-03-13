import React, { useState, useEffect, useContext } from "react";
import { ManagerContext } from "../Store";
import PlayersPageHeaders from "./PlayersPageHeaders";
import Players from "./Players";
import ShortlistModal from "./ShortlistModal";

export default function PlayersPage() {
  const [showShortlist, setShowShortlist] = useState(false);
  const [shortlistPlayer, setShortlistPlayer] = useState();
  const [manager, setManager] = useContext(ManagerContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShortlistClick = (player) => {
    console.log(`short list clicked for ${player.name}`);
    setShowShortlist(true);
    setShortlistPlayer(player);
  };

  return (
    <>
      {showShortlist && shortlistPlayer && (
        <ShortlistModal
          closeModal={() => setShowShortlist(false)}
          player={shortlistPlayer}
        />
      )}
      <PlayersPageHeaders />
      <Players handleShortlistClick={handleShortlistClick} />
    </>
  );
}
