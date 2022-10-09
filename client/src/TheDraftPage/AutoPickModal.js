import React, { useContext, useEffect, useRef, useState } from "react";
import ModalTemplate from "../ModalTemplate";
import {
  LeagueContext,
  LeagueManagersContext as ManagersContext,
  PlayersContext,
  VidiprinterContext,
} from "../Store";
import autoPick from "./AutoPick";
import Search from "../utils/search";
import ManagerProps from "../utils/ManagerProps";
import Helpers from "../utils/Helpers";

const AutoPickModal = ({ closeModal, updateVidi, updateLeague }) => {
  const [players] = useContext(PlayersContext);
  const [managers, setManagers] = useContext(ManagersContext);
  const [league, setLeague] = useContext(LeagueContext);
  const [, setVidiprinter] = useContext(VidiprinterContext);

  const [loading, setLoading] = useState(true);
  const [foundPlayer, setFoundPlayer] = useState({
    name: "no player found",
    role: "...",
  });
  const [updatedManager, setUpdatedManager] = useState();
  const previousPlayer = usePrevious(foundPlayer);
  // const playerRef = useRef({ name: "no player found", role: "..." });
  // const managerRef = useRef();

  const pickingManager = managers.find(
    (manager) => manager.pickNumber === league.pickNumber
  );

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    console.log("initial use effect, updating data");
    getUpdatedData();
  }, []);

  useEffect(() => {
    console.log(foundPlayer);
    if (pickingManager.stage1Squad.length < 13 && foundPlayer.role === "...") {
      const pickedPlayerObj = autoPick(
        league,
        pickingManager,
        managers,
        players
      );
      setFoundPlayer(pickedPlayerObj.player);
      setUpdatedManager(pickedPlayerObj.managerCopy);
      // playerRef.current = pickedPlayerObj.player;
      // managerRef.current = pickedPlayerObj.managerCopy;
    }
  });

  const getUpdatedData = async () => {
    const managersData = await Search.getAllManagers();
    const leagueData = await Search.getLeagueById(league.id);
    const vidiprinterData = await Search.getVidiprinterById(league.id);
    vidiprinterData.reverse();
    ManagerProps.getManagerProperties(managersData, players);
    setManagers(Helpers.setManagersByLeague(league, managersData));
    setLeague(leagueData[0]);
    setVidiprinter(vidiprinterData);
    setLoading(false);
    console.log(`Updating draft Data`);
  };

  const pickPlayer = async () => {
    try {
      setLoading(true);
      await Search.putManager(updatedManager);
      await updateVidi(league.id, pickingManager.id, foundPlayer.id);
      await updateLeague();
      await getUpdatedData();
      setLoading(false);
      closeModal();
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log({ pickingManager });

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
          {!loading && (
            <div className="apm-player-wrapper">
              {pickingManager.stage1Squad.length >= 13 ? (
                <div>{pickingManager.name} has a full squad.</div>
              ) : (
                <div className="apm-pick-caption">
                  {foundPlayer.role === "..." ? (
                    <div>Finding player...</div>
                  ) : (
                    <div>
                      Pick {foundPlayer.name} ({foundPlayer.role}) for{" "}
                      {pickingManager.teamName}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <div className="apm-button-wrapper">
            {!loading && (
              <>
                <button onClick={closeModal} className="apm-cancel-btn">
                  Cancel
                </button>
                {pickingManager.stage1Squad.length >= 13 ? null : (
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
