import React, { useContext, useState } from "react";
import { SearchNameContext } from "./Store";
import myTeam from "./img/MyTeam.png";
import MyTeamModal from "./MyTeamModal";
import ManagerPicking from "./ManagerPicking";

export default function DraftTitle(props) {
  const [searchName, setSearchName] = useContext(SearchNameContext);
  const [showMyTeam, setShowMyTeam] = useState(false);

  function hideModals() {
    setShowMyTeam(false);
  }

  return (
    <div className="draft-header">
      <div className="disappear-small">
        <div className="flex-container space-between">
          <div className="draft-title-container">
            <ManagerPicking />
          </div>
          <div className="draft-title-container">
            <div className="page-title">{props.title}</div>
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
          <div className="page-title">{props.title}</div>
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
