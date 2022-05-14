import React, { useContext } from "react";
import {
  ManagerContext,
  PlayersContext,
  LeagueContext,
} from "../Store";
import ShortlistPlayerButton from "./ShortlistPlayerButton";

export default function AvailablePlayers() {
  const [manager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  const [league] = useContext(LeagueContext);

  console.log("league", league);

  const qualifiedPlayers = players.filter((player) =>
    league.stage2Teams.includes(player.teamId) && !manager.stage2Shortlist.includes(player.id)
  );

  console.log("qualified players", qualifiedPlayers);

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
          <div style={{ width: "170px" }}>Name</div>
          <div style={{ width: "85px", textAlign: "center" }}>Role</div>
          <div style={{ width: "85px", textAlign: "center" }}>Team</div>
          <div style={{ width: "85px", textAlign: "center" }}>Runs</div>
          <div style={{ width: "85px", textAlign: "center" }}>Wickets</div>
          <div style={{ width: "85px", textAlign: "center" }}>Catches</div>
          <div style={{ width: "85px", textAlign: "center" }}>Total points</div>
          <div style={{ width: "150px", textAlign: "center" }}>
            Shortlist Position
          </div>
        </div>
        {qualifiedPlayers.map((playerId, index) =>
          getPlayerEntry(playerId, index)
        )}
      </div>
    </div>
  );
}
