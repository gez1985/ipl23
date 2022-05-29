import React, { useContext } from "react";
import { ManagerContext, PlayersContext, TeamsContext } from "../Store";
import Helpers from "../utils/Helpers";
import RemovePlayerButton from "./RemovePlayerButton";

export default function MyShortlist() {
  const [manager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  const [teams] = useContext(TeamsContext);

  const listedPlayers = manager.stage3Shortlist.map((playerId) => {
    return Helpers.getObjectById(players, playerId);
  });

  const renderPlayerEntry = (player, index) => {
    const teamName = Helpers.getNameById(teams, player.teamId);
    return (
      <div className="ss-my-shortlist-entry" key={index}>
        {player && (
          <>
            <div className="ss-index">{index + 1}</div>
            <div className="ss-shortlist-name">{player.name}</div>
            <div className="ss-shortlist-detail">{player.role}</div>
            <div className="ss-shortlist-detail">{teamName}</div>
            <div className="ss-shortlist-detail">
              {player.totalPoints || "0"}
            </div>
            <RemovePlayerButton index={index} />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="ss-my-shortlist-container">
      <h1 className="ss-title">My Shortlist</h1>
      <div className="ss-list-container">
        <div className="ss-headers">
          <div style={{ width: "24px" }}></div>
          <div
            style={{
              width: "150px",
              margin: "0 20px 0 10px",
              textAlign: "left",
            }}
          >
            Name
          </div>
          <div style={{ width: "85px", textAlign: "center" }}>Role</div>
          <div style={{ width: "85px", textAlign: "center" }}>Team</div>
          <div style={{ width: "85px", textAlign: "center" }}>Total Points</div>
          <div style={{ width: "85px" }}></div>
        </div>
        {listedPlayers.map((player, index) => renderPlayerEntry(player, index))}
      </div>
    </div>
  );
}
