import React, { useContext, useEffect, useRef, useState } from "react";
import ModalTemplate from "../ModalTemplate";
import {
  LeagueContext,
  LeagueManagersContext as ManagersContext,
  PlayersContext,
} from "../Store";
import autoPick from "./AutoPick";
import Search from "../utils/search";

const AutoPickModal = ({ closeModal, updateVidi, updateLeague }) => {
  const [players] = useContext(PlayersContext);
  const [managers] = useContext(ManagersContext);
  const [league] = useContext(LeagueContext);
  const [loading, setLoading] = useState(false);
  const playerRef = useRef({ name: "no player found", role: "..." });
  const managerRef = useRef();

  useEffect(() => {
    console.log(playerRef);
    if (playerRef.current.role === "...") {
      const pickedPlayerObj = autoPick(
        league,
        pickingManager,
        managers,
        players
      );
      playerRef.current = pickedPlayerObj.player;
      managerRef.current = pickedPlayerObj.managerCopy;
    }
  });

  const pickingManager = managers.find(
    (manager) => manager.pickNumber === league.pickNumber
  );

  const pickPlayer = async () => {
    try {
      setLoading(true);
      await Search.putManager(managerRef.current);
      await updateVidi(league.id, pickingManager.id, playerRef.current.id);
      await updateLeague();
      setLoading(false);
      closeModal();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <ModalTemplate
        closeModal={closeModal}
        title={
          <div style={{ color: "#dd6d1f" }}>
            Auto pick for {pickingManager.name}
          </div>
        }
      >
        {!pickingManager.autoPick && (
          <div className="apm-warning">
            {pickingManager.name} does not have auto pick selected. Are you sure
            you wish to use auto pick?
          </div>
        )}
        <div className="apm-container">
          <div className="apm-player-wrapper">
            {pickingManager.stage1Squad >= 15 ? (
              <div>{pickingManager.name} has a full squad.</div>
            ) : (
              <div className="apm-pick-caption">
                {playerRef.current.role === "..." ? (
                  <div>Finding player...</div>
                ) : (
                  <div>
                    Pick {playerRef.current.name} ({playerRef.current.role}) for{" "}
                    {pickingManager.teamName}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="apm-button-wrapper">
            {!loading && (
              <>
                <button onClick={closeModal} className="apm-cancel-btn">
                  Cancel
                </button>
                {pickingManager.stage1Squad >= 15 ? null : (
                  <button onClick={pickPlayer} className="apm-pick-btn">
                    Pick Player
                  </button>
                )}
              </>
            )}
            {loading && <div>Loading...</div>}
          </div>
        </div>
      </ModalTemplate>
    </>
  );
};

export default AutoPickModal;
