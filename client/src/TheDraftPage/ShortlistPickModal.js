import React, { useContext } from "react";
import ModalTemplate from "../ModalTemplate";
import {
  PlayersContext,
  ManagerContext,
  LeagueManagersContext as ManagersContext,
  LeagueContext,
} from "../Store";
import select from "../img/Select.png";
import selectAlt from "../img/SelectGrey.png";
import Helpers from "../utils/Helpers";
import DraftValidation from "./DraftValidation";

const ShortlistPickModal = ({ closeModal, selectPlayer }) => {
  const [players] = useContext(PlayersContext);
  const [manager] = useContext(ManagerContext);
  const [managers] = useContext(ManagersContext);
  const [league] = useContext(LeagueContext);

  const unpickedPlayers = Helpers.getUnpickedPlayers(managers, players, league);
  const unpickedPlayersIds = unpickedPlayers.map((player) => player.id);

  const shortlistPlayers = [];
  manager.shortlist.forEach((playerId) => {
    shortlistPlayers.push(Helpers.getObjectById(players, playerId));
  });

  const availablePlayers = shortlistPlayers.filter((player) =>
    unpickedPlayersIds.includes(player.id)
  );

  const validPlayers = availablePlayers.filter((player) =>
    DraftValidation.playerValid(league, manager, players, player)
  );

  const myPick = DraftValidation.myPick(manager, league);

  const getTitle = () => {
    if (myPick) {
      return <div style={{ color: "green" }}>My shortlist - My Pick</div>;
    }
    return "my shortlist";
  };

  const TableHeaders = () => {
    return (
      <div className="spm-headers-wrapper">
        <div className="spm-header" style={{ width: "30%" }}>
          Name
        </div>
        <div className="spm-header" style={{ width: "20%" }}>
          Role
        </div>
        <div className="spm-header" style={{ width: "20%" }}>
          Team
        </div>
        <div className="spm-header" style={{ width: "30%" }}>
          Pick Player
        </div>
      </div>
    );
  };

  const getPlayerRow = (player, idx) => {
    const { name, role, team } = player;
    if (!player) {
      return <></>;
    }

    return (
      <div key={idx} className="spm-player-row">
        <div className="spm-player-detail" style={{ width: "30%" }}>
          {name}
        </div>
        <div className="spm-player-detail" style={{ width: "20%" }}>
          {role}
        </div>
        <div className="spm-player-detail" style={{ width: "20%" }}>
          {team}
        </div>
        <div className="spm-player-detail" style={{ width: "30%" }}>
          <img
            className="spm-select-icon"
            src={myPick ? select : selectAlt}
            alt="home"
            onClick={myPick ? () => selectPlayer(player) : null}
            style={{ cursor: myPick ? "pointer" : null }}
          />
        </div>
      </div>
    );
  };

  return (
    <ModalTemplate closeModal={closeModal} title={getTitle()}>
      <TableHeaders />
      <div className="spm-container">
        {validPlayers.map((player, idx) => getPlayerRow(player, idx))}
      </div>
    </ModalTemplate>
  );
};

export default ShortlistPickModal;
