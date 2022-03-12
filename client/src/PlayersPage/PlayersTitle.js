import React, { useContext } from "react";
import { IncludeContext, SearchNameContext } from "../Store";

export default function PlayersTitle(props) {
  const [, setInclude] = useContext(IncludeContext);
  const [searchName, setSearchName] = useContext(SearchNameContext);

  return (
    <div className="players-header">
      <div className="flex-container space-between">
        <div className="players-title-container-end disappear-small">
          <input
            type="text"
            placeholder="Search by name:"
            className="player-search"
            onChange={(e) => setSearchName(e.target.value)}
            defaultValue={searchName}
          ></input>
        </div>
        <div className="players-title-container-middle disappear-small">
          <div className="page-title">{props.title}</div>
        </div>
        <div className="players-title-container-end align-items-end disappear-small">
          <button
            className="include-button"
            onClick={() => setInclude("allPlayers")}
          >
            All Players
          </button>
          <button
            className="include-button"
            onClick={() => setInclude("drafted")}
          >
            Drafted
          </button>
          <button
            className="include-button"
            onClick={() => setInclude("notSelected")}
          >
            Not Selected
          </button>
        </div>
      </div>
      <div className="flex-container">
        <div className="disappear-big title-container-small">
          <div className="page-title players-title">{props.title}</div>
        </div>
        <div className="disappear-big title-container-small">
          <input
            type="text"
            placeholder="Search by name:"
            className="player-search"
            onChange={(e) => setSearchName(e.target.value)}
            defaultValue={searchName}
          ></input>
        </div>
      </div>
      <div className="flex-container disappear-big">
        <button
          className="include-button"
          onClick={() => setInclude("allPlayers")}
        >
          All Players
        </button>
        <button
          className="include-button"
          onClick={() => setInclude("drafted")}
        >
          Drafted
        </button>
        <button
          className="include-button"
          onClick={() => setInclude("notSelected")}
        >
          Not Selected
        </button>
      </div>
    </div>
  );
}
