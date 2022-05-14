import React, { useContext, useState } from "react";
import { ManagerContext } from "../Store";
import Search from "../utils/search";
import Loader from "react-loader-spinner";

export default function MyPlayersButtons({ playerId }) {
  const [manager, setManager] = useContext(ManagerContext);
  const [loading, setLoading] = useState(false);

  const handleKeepClick = async (playerId) => {
    const managerCopy = JSON.parse(JSON.stringify(manager));
    if (manager.stage2Squad.includes(playerId)) {
      return;
    } else {
      managerCopy.stage2Squad.push(playerId);
      setLoading(true);
      await Search.putManager(managerCopy);
      setManager(managerCopy);
      setLoading(false);
    }
  };

  const handleDiscardClick = async (playerId) => {
    const managerCopy = JSON.parse(JSON.stringify(manager));
    if (!manager.stage2Squad.includes(playerId)) {
      return;
    } else {
      const index = managerCopy.stage2Squad.indexOf(playerId);
      managerCopy.stage2Squad.splice(index, 1);
      setLoading(true);
      await Search.putManager(managerCopy);
      setManager(managerCopy);
      setLoading(false);
    }
  };

  const getKeepButtonClassName = (playerId) => {
    if (manager.stage2Squad.includes(playerId)) {
      return "ss-button ss-button-keep";
    } else {
      return "ss-button ss-button-keep-disabled";
    }
  };

  const getDiscardButtonClassName = (playerId) => {
    if (manager.stage2Squad.includes(playerId)) {
      return "ss-button ss-button-discard-disabled";
    } else {
      return "ss-button ss-button-discard";
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
