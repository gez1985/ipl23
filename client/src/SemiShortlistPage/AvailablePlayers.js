import React, { useContext, useState, useEffect } from "react";
import { ManagerContext, PlayersContext, LeagueContext } from "../Store";
import ShortlistPlayerButton from "./ShortlistPlayerButton";
const sortObjectsArray = require("sort-objects-array");

export default function AvailablePlayers() {
  const [manager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  const [league] = useContext(LeagueContext);
  const [sortBy, setSortBy] = useState("totalPoints");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    if (sortBy === "name" || sortBy === "role" || sortBy === "team") {
      setOrder("");
    } else {
      setOrder("desc");
    }
  }, [sortBy]);

  const qualifiedPlayers = players.filter(
    (player) =>
      league.stage2Teams.includes(player.teamId) &&
      !manager.stage2Shortlist.includes(player.id)
  );

  console.log("order", order);

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
          <div style={{ width: "170px" }} onClick={() => setSortBy("name")}>
            Name
          </div>
          <div
            style={{ width: "85px", textAlign: "center" }}
            onClick={() => setSortBy("role")}
          >
            Role
          </div>
          <div
            style={{ width: "85px", textAlign: "center" }}
            onClick={() => setSortBy("team")}
          >
            Team
          </div>
          <div
            style={{ width: "85px", textAlign: "center" }}
            onClick={() => setSortBy("runs")}
          >
            Runs
          </div>
          <div
            style={{ width: "85px", textAlign: "center" }}
            onClick={() => setSortBy("wickets")}
          >
            Wickets
          </div>
          <div
            style={{ width: "85px", textAlign: "center" }}
            onClick={() => setSortBy("catches")}
          >
            Catches
          </div>
          <div
            style={{ width: "85px", textAlign: "center" }}
            onClick={() => setSortBy("totalPoints")}
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
