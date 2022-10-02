import React, { useContext } from "react";
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

  const pickingManager = managers.find(
    (manager) => manager.pickNumber === league.pickNumber
  );

  const pickedPlayerObj = autoPick(league, pickingManager, managers, players);
  const { player, managerCopy } = pickedPlayerObj;

  const pickPlayer = async () => {
    try {
      await Search.putManager(managerCopy);
      await updateVidi(league.id, pickingManager.id, player.id);
      await updateLeague();
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
                Pick {player.name} ({player.role}) for {pickingManager.teamName}
              </div>
            )}
          </div>
          <div className="apm-button-wrapper">
            <button onClick={closeModal} className="apm-cancel-btn">
              Cancel
            </button>
            {pickingManager.stage1Squad >= 15 ? null : (
              <button onClick={pickPlayer} className="apm-pick-btn">
                Pick Player
              </button>
            )}
          </div>
        </div>
      </ModalTemplate>
    </>
  );
};

export default AutoPickModal;
