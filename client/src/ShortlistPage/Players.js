import React, { useContext, useState } from "react";
import {
  ManagerContext,
  PlayersContext,
  LeagueContext,
  SearchNameContext,
} from "../Store";
import ShortlistPlayerButton from "./ShortlistPlayerButton";
// import ShortlistPlayerButton from "./ShortlistPlayerButton";
const sortObjectsArray = require("sort-objects-array");

const Players = () => {
  const [manager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  const [league] = useContext(LeagueContext);
  const [searchName] = useContext(SearchNameContext);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("");

  const availablePlayers = players.filter(
    (player) => !manager.shortlist.includes(player.id)
  );

  const listedPlayers = sortObjectsArray(availablePlayers, sortBy, order);
  const namedPlayers = listedPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const getTableHeaders = () => {
    return (
      <div className="shortlist-named-players-headers-wrapper">
        <div className="shortlist-page-player-entry" style={{ width: "30%" }}>
          Name
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "20%" }}>
          Role
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "20%" }}>
          Team
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "30%" }}>
          Shortlist Position
        </div>
      </div>
    );
  };

  const handleSortClick = (newSort) => {
    if (newSort === "name" || newSort === "role" || newSort === "team") {
      setOrder("");
    } else {
      setOrder("desc");
    }
    setSortBy(newSort);
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
