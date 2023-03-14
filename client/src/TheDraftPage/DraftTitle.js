import React, { useState, useContext } from "react";
import {
  ManagerContext,
  SearchNameContext,
  LeagueContext,
  LeagueManagersContext as ManagersContext,
} from "../Store";
import myTeam from "../img/MyTeam.png";
import MyTeamModal from "../MyTeamModal";
import ManagerPicking from "./ManagerPicking";
import CountdownTimer from "./CountdownTimer";

export default function DraftTitle({
  title,
  skipPick,
  live,
  showShortlistModal,
  showAutoPickModal,
  resetTimer,
}) {
  const [searchName, setSearchName] = useContext(SearchNameContext);
  const [manager] = useContext(ManagerContext);
  const [league] = useContext(LeagueContext);
  const [managers] = useContext(ManagersContext);
  const [showMyTeam, setShowMyTeam] = useState(false);

  function hideModals() {
    setShowMyTeam(false);
  }

  const getTimer = () => {
    if (live && league.pickNumber === manager.pickNumber) {
      return (
        <CountdownTimer
          skipPick={skipPick}
          live={live}
          resetTimer={resetTimer}
        />
      );
    }
    if (live && manager.id === league.adminManagerId) {
      const pickingManager = managers.find(
        (manager) => manager.pickNumber === league.pickNumber
      );
      if (pickingManager.autoPick) {
        return (
          <div className="auto-pick-button-wrapper">
            <button
              className="desktop-draft-shortlist-pick-button auto-pick-button"
              onClick={handleAutoPick}
            >
              Auto Pick
            </button>
          </div>
        );
      }
      return (
        <div className="auto-pick-button-wrapper">
          <button
            className="desktop-draft-shortlist-pick-button auto-pick-button2"
            onClick={handleAutoPick}
          >
            Auto Pick
          </button>
        </div>
      );
    } else {
      return title;
    }
  };

  const handleAutoPick = async () => {
    console.log("auto pick clicked");
    showAutoPickModal();
    // const pickingManager = managers.find(
    //   (manager) => manager.pickNumber === league.pickNumber
    // );
    // if (!pickingManager.autoPick) {
    //   alert("manager does not have aut pick selected");
    //   return;
    // } else {
    //   console.log(`auto picking player for ${pickingManager.name}`);
    //   const pickedPlayer = await autoPick(
    //     league,
    //     pickingManager,
    //     managers,
    //     players
    //   );
    //   console.log({ pickedPlayer });
    // }
  };

  return (
    <div className="draft-header">
      <div className="disappear-small">
        <div className="flex-container space-between">
          <div className="draft-title-container">
            <div className="draft-desktop-left-container">
              <div>
                <ManagerPicking />
              </div>
              <button
                className="desktop-draft-shortlist-pick-button"
                onClick={showShortlistModal}
              >
                Shortlist
              </button>
            </div>
          </div>
          <div className="draft-title-container">
            <div className="page-title">{getTimer()}</div>
          </div>
          <div className="flex-container draft-title-container align-items-end">
            <img
              className="draft-team-icon cursor-pointer"
              src={myTeam}
              alt="my-team"
              onClick={() => setShowMyTeam(true)}
            />
            <input
              type="text"
              placeholder="Search by name:"
              className="player-search"
              onChange={(e) => setSearchName(e.target.value.toLowerCase())}
              defaultValue={searchName}
            ></input>
          </div>
        </div>
      </div>
      <div className="flex-container disappear-big">
        <div className="flex-container draft-title-container align-items-start">
          <div className="page-title">{getTimer()}</div>
        </div>
        <div className="flex-container draft-middle-container">
          <img
            className="draft-team-icon cursor-pointer"
            src={myTeam}
            alt="my-team"
            onClick={() => setShowMyTeam(true)}
          />
        </div>
        <div className="flex-container draft-title-container align-items-end">
          <input
            type="text"
            placeholder="Search by name:"
            className="player-search"
            onChange={(e) => setSearchName(e.target.value)}
            defaultValue={searchName}
          ></input>
        </div>
      </div>
      <div className="disappear-big">
        <ManagerPicking />
      </div>
      {showMyTeam && <MyTeamModal hide={hideModals} />}
    </div>
  );
}
