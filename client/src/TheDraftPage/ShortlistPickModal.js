import React, { useContext } from "react";
import ModalTemplate from "../ModalTemplate";
import {
  PlayersContext,
  TeamsContext,
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
  const [teams] = useContext(TeamsContext);
  const [manager, setManager] = useContext(ManagerContext);
  const [managers, setManagers] = useContext(ManagersContext);
  const [league] = useContext(LeagueContext);

  const unpickedPlayers = Helpers.getUnpickedPlayers(managers, players, league);

  const availablePlayers = unpickedPlayers.filter((player) =>
    manager.shortlist.includes(player.id)
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
        {availablePlayers.map((player, idx) => getPlayerRow(player, idx))}
      </div>
    </ModalTemplate>
  );
};

export default ShortlistPickModal;
