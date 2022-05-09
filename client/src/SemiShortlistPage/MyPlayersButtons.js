import React, { useContext, useState, useEffect } from "react";
import { ManagerContext } from "../Store";
import Search from "../utils/search";
import Loader from "react-loader-spinner";

export default function MyPlayersButtons({ playerId }) {
  const [manager, setManager] = useContext(ManagerContext);
  const [loading, setLoading] = useState(false);

  const handleKeepClick = async (playerId) => {
    const managerCopy = JSON.parse(JSON.stringify(manager));
    if (manager.stage2Shortlist.includes(playerId)) {
      return;
    } else {
      managerCopy.stage2Shortlist.push(playerId);
      setLoading(true);
      await Search.putManager(managerCopy);
      setManager(managerCopy);
      setLoading(false);
    }
    console.log(manager);
  };

  const handleDiscardClick = async (playerId) => {
    console.log(`discard clicked for ${playerId}`);
  };

  const getKeepButtonClassName = (playerId) => {
    if (manager.stage2Shortlist.includes(playerId)) {
      return "ss-my-players-button ss-my-players-keep";
    } else {
      return "ss-my-players-button ss-my-players-button-keep-disabled";
    }
  };

  const getDiscardButtonClassName = (playerId) => {
    if (manager.stage2Shortlist.includes(playerId)) {
      return "ss-my-players-button ss-my-players-button-discard-disabled";
    } else {
      return "ss-my-players-button ss-my-players-discard";
    }
  };

  if (loading) {
    return <Loader type="TailSpin" color="#dd6d1f" height={30} width={30} />;
  }

  return (
    <div>
      <button
        className={getKeepButtonClassName(playerId)}
        onClick={() => handleKeepClick(playerId)}
      >
        Keep
      </button>
      <button
        className={getDiscardButtonClassName(playerId)}
        onClick={() => handleDiscardClick(playerId)}
      >
        Discard
      </button>
    </div>
  );
}
