import React, { useContext, useState } from "react";
import {
  LeagueContext,
  ManagersContext,
  PlayersContext,
  SearchNameContext,
  ManagerContext
} from "../Store";
import TransportListPlayerButton from "./TransferListPlayerButton";
import Helpers from "../utils/Helpers";
const sortObjectsArray = require("sort-objects-array");

const Players = () => {
  const [league] = useContext(LeagueContext);
  const [manager] = useContext(ManagerContext);
  const [managers] = useContext(ManagersContext);
  const [players] = useContext(PlayersContext);
  const [searchName] = useContext(SearchNameContext);
  const [sortBy, setSortBy] = useState("name");

  const availablePlayers = players.filter(
    (player) => !manager.transfers.includes(player.id)
  );

  const unPickedPlayers = Helpers.getTransferPlayers(
    managers,
    availablePlayers,
    league
  );

  const listedPlayers = sortObjectsArray(unPickedPlayers, sortBy, "");
  const namedPlayers = listedPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchName.toLowerCase())
  );

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
          <TransportListPlayerButton playerId={player.id} />
        </div>
      </div>
    );
  };

  return (
    <div className="tp-ap-container">
      <h2 className="tp-ap-heading">Available Players</h2>
      <div className="tp-ap-table">
        <div className="tp-headers-wrapper">
          <h5 className="tp-ap-header" style={{ width: "30%" }}>
            Name
          </h5>
          <h5 className="tp-ap-header" style={{ width: "20%" }}>
            Role
          </h5>
          <h5 className="tp-ap-header" style={{ width: "20%" }}>
            Team
          </h5>
          <h5
            className="tp-ap-header"
            style={{ width: "30%", marginRight: "3px" }}
          >
            Transfer Position
          </h5>
        </div>
        <div className="tp-ap-players-list-wrapper">
          <div className="tp-ap-players-list">
            {namedPlayers.map((player, index) => getPlayerRow(player, index))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Players;
