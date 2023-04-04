import React, { useContext } from "react";
import { ManagerContext, PlayersContext } from "../Store";
import Helpers from "../utils/Helpers";
import RemovePlayerButton from "./RemovePlayerButton";

const TransferList = () => {
  const [manager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);

  const listedPlayers = manager.shortlist.map((playerId) => {
    return Helpers.getObjectById(players, playerId);
  });

  const getTableHeaders = () => {
    return (
      <div className="shortlist-named-players-headers-wrapper">
        <div
          className="shortlist-page-player-entry"
          style={{ width: "5%" }}
        >No.</div>
        <div className="shortlist-page-player-entry" style={{ width: "35%" }}>
          Name
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "20%" }}>
          Role
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "20%" }}>
          Team
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "20%" }}>
          <div style={{ marginRight: "10px" }}>Remove</div>
        </div>
      </div>
    );
  };

  const getPlayerRow = (player, index) => {
    return (
      <div className="ss-my-players-list-entry" key={index}>
        <div className="shortlist-page-player-entry" style={{ width: "5%" }}>
          {index + 1}
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "35%" }}>
          {player.name}
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "20%" }}>
          {player.role}
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "20%" }}>
          {player.team}
        </div>
        <div className="shortlist-page-player-entry" style={{ width: "20%" }}>
          <RemovePlayerButton index={index} />
        </div>
      </div>
    );
  };

  return (
    <div className="tp-ap-container">
      <h2 className="tp-ap-heading">Transfer List</h2>
      <div className="tp-ap-table">
        <div className="tp-headers-wrapper">
          <h5 className="tp-ap-header" style={{ width: "7.5%" }}>
            No.
          </h5>
          <h5 className="tp-ap-header" style={{ width: "30%" }}>
            Name
          </h5>
          <h5 className="tp-ap-header" style={{ width: "15%" }}>
            Role
          </h5>
          <h5
            className="tp-ap-header"
            style={{ width: "20%" }}
          >
            Team
          </h5>
          <h5
            className="tp-ap-header"
            style={{ width: "20%", marginRight: "3px" }}
          >
            Remove
          </h5>
        </div>
        <div className="tp-ap-players-list-wrapper">
          <div className="tp-ap-players-list">
            {/* {namedPlayers.map((player, index) => getPlayerRow(player, index))} */}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="shortlist-players-container">
      {getTableHeaders()}
      <div className="shortlist-scrollable-content shortlist-player-wrapper">
        {listedPlayers.map((player, index) => getPlayerRow(player, index))}
      </div>
    </div>
  );
};

export default TransferList;
