import React, { useContext, useState } from "react";
import { ManagerContext, PlayersContext, SearchNameContext } from "../Store";
import ShortlistPlayerButton from "./ShortlistPlayerButton";
const sortObjectsArray = require("sort-objects-array");

const Players = () => {
  const [manager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  const [searchName] = useContext(SearchNameContext);
  const [sortBy, setSortBy] = useState("name");

  const availablePlayers = players.filter(
    (player) => !manager.shortlist.includes(player.id)
  );

  const listedPlayers = sortObjectsArray(availablePlayers, sortBy, "");
  const namedPlayers = listedPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const getTableHeaders = () => {
    return (
      <div className="shortlist-named-players-headers-wrapper">
        <div
          className="shortlist-page-player-entry"
          style={{ width: "30%", cursor: "pointer" }}
          onClick={() => setSortBy("name")}
        >
          Name
        </div>
        <div
          className="shortlist-page-player-entry"
          style={{ width: "20%", cursor: "pointer" }}
          onClick={() => setSortBy("role")}
        >
          Role
        </div>
        <div
          className="shortlist-page-player-entry"
          style={{ width: "20%", cursor: "pointer" }}
          onClick={() => setSortBy("team")}
        >
          Team
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "30%" }}>
          Shortlist Position
        </div>
      </div>
    );
  };

  const getPlayerRow = (player, index) => {
    return (
      <div className="ss-my-players-list-entry" key={index}>
        <div className="shortlist-page-player-entry" style={{ width: "30%" }}>
          {player.name}
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "20%" }}>
          {player.role}
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "20%" }}>
          {player.team}
        </div>
        <div style={{ width: "30%" }}>
          <ShortlistPlayerButton playerId={player.id} />
        </div>
      </div>
    );
  };

  return (
    <div className="shortlist-players-container">
      {getTableHeaders()}
      <div className="shortlist-scrollable-content shortlist-player-wrapper">
        {namedPlayers.map((player, index) => getPlayerRow(player, index))}
      </div>
    </div>
  );
};

export default Players;
