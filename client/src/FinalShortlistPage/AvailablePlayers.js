import React, { useContext, useState } from "react";
import { ManagerContext, PlayersContext, LeagueContext } from "../Store";
import ShortlistPlayerButton from "./ShortlistPlayerButton";
const sortObjectsArray = require("sort-objects-array");

export default function AvailablePlayers() {
  const [manager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  const [league] = useContext(LeagueContext);
  const [sortBy, setSortBy] = useState("totalPoints");
  const [order, setOrder] = useState("desc");

  const qualifiedPlayers = players.filter(
    (player) =>
      league.stage3Teams.includes(player.teamId) &&
      !manager.stage3Shortlist.includes(player.id)
  );

  const handleSortClick = (newSort) => {
    if (newSort === "name" || newSort === "role" || newSort === "team") {
      setOrder("");
    } else {
      setOrder("desc");
    }
    setSortBy(newSort);
  };

   const listedPlayers = sortObjectsArray(qualifiedPlayers, sortBy, order);

  const getPlayerEntry = (player, index) => {
    return (
      <div className="ss-my-players-list-entry" key={index}>
        <div
          className="ss-players-data"
          style={{ width: "170px", textAlign: "left" }}
        >
          {player.name}
        </div>
        <div className="ss-players-data" style={{ width: "85px" }}>
          {player.role}
        </div>
        <div className="ss-players-data" style={{ width: "85px" }}>
          {player.team}
        </div>
        <div className="ss-players-data" style={{ width: "85px" }}>
          {player.runs}
        </div>
        <div className="ss-players-data" style={{ width: "85px" }}>
          {player.wickets}
        </div>
        <div className="ss-players-data" style={{ width: "85px" }}>
          {player.catches}
        </div>
        <div className="ss-players-data" style={{ width: "85px" }}>
          {player.totalPoints}
        </div>
        <ShortlistPlayerButton playerId={player.id} />
      </div>
    );
  };

  return (
    <div className="ss-player-list">
      <h1 className="ss-title">Qualified Players</h1>
      <div className="ss-list-container">
        <div className="ss-headers">
          <div style={{ width: "170px" }} onClick={() => handleSortClick("name")}>
            Name
          </div>
          <div
            style={{ width: "85px", textAlign: "center" }}
            onClick={() => handleSortClick("role")}
          >
            Role
          </div>
          <div
            style={{ width: "85px", textAlign: "center" }}
            onClick={() => handleSortClick("team")}
          >
            Team
          </div>
          <div
            style={{ width: "85px", textAlign: "center" }}
            onClick={() => handleSortClick("runs")}
          >
            Runs
          </div>
          <div
            style={{ width: "85px", textAlign: "center" }}
            onClick={() => handleSortClick("wickets")}
          >
            Wickets
          </div>
          <div
            style={{ width: "85px", textAlign: "center" }}
            onClick={() => handleSortClick("catches")}
          >
            Catches
          </div>
          <div
            style={{ width: "85px", textAlign: "center" }}
            onClick={() => handleSortClick("totalPoints")}
          >
            Total points
          </div>
          <div style={{ width: "150px", textAlign: "center" }}>
            Shortlist Position
          </div>
        </div>
        {listedPlayers.map((playerId, index) =>
          getPlayerEntry(playerId, index)
        )}
      </div>
    </div>
  );
}
