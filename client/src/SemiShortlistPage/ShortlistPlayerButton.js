import React, { useState, useContext } from "react";
import { ManagerContext } from "../Store";
import Loader from "react-loader-spinner";
import Search from "../utils/search";

export default function ShortlistPlayerButton({ playerId }) {
  const [manager, setManager] = useContext(ManagerContext);
  const [addPosition, setAddPosition] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddPositionChange = (e) => {
    setAddPosition(Math.floor(e.target.value));
  };

  const handleAddPlayerClick = async () => {
    console.log(`add player clicked for player ${playerId} at position ${addPosition}`);
    if (!addPosition || addPosition < 1) {
      alert("Error: check the add number");
    } else {
      setLoading(true);
      try {
        const managerCopy = JSON.parse(JSON.stringify(manager));
        if (addPosition > manager.stage2Shortlist.length) {
          managerCopy.stage2Shortlist.push(playerId);
        } else if (addPosition === 1) {
          managerCopy.stage2Shortlist.unshift(playerId);
        } else {
          managerCopy.stage2Shortlist.splice(addPosition - 1, 0, playerId);
        }
        await Search.putManager(managerCopy);
        setManager(managerCopy);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ss-loader-container" style={{ width: "150px" }}>
        <Loader type="TailSpin" color="#dd6d1f" height={30} width={30} />
      </div>
    );
  }

  return (
    <div className="ss-add-player-container" style={{ width: "150px" }}>
      <input
        className="ss-number-input"
        type="number"
        min={1}
        defaultValue={1}
        onChange={handleAddPositionChange}
      />
      <button className="ss-button ss-button-keep" onClick={handleAddPlayerClick}>Add</button>
    </div>
  );
}
