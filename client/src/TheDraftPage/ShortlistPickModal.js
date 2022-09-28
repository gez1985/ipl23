import React, { useContext } from "react";
import ModalTemplate from "../ModalTemplate";
import {
  PlayersContext,
  TeamsContext,
  ManagerContext,
  LeagueManagersContext as ManagersContext,
  SortContext,
  SearchNameContext,
  LeagueContext,
} from "../Store";
import select from "../img/Select.png";
import Helpers from "../utils/Helpers";

const ShortlistPickModal = ({ closeModal }) => {
  const [players] = useContext(PlayersContext);
  const [teams] = useContext(TeamsContext);
  const [manager, setManager] = useContext(ManagerContext);
  const [managers, setManagers] = useContext(ManagersContext);
  const [league] = useContext(LeagueContext);

  console.log({ manager });

  const unpickedPlayers = Helpers.getUnpickedPlayers(managers, players, league);
  console.log({ unpickedPlayers });

  const availablePlayers = unpickedPlayers.filter((player) =>
    manager.shortlist.includes(player.id)
  );

  const handleSelectPlayer = (player) => {
    console.log(`${player.name} picked`);
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
            src={select}
            alt="home"
            onClick={() => handleSelectPlayer(player)}
          />
        </div>
      </div>
    );
  };

  return (
    <ModalTemplate closeModal={closeModal} title="MY SHORTLIST">
      <TableHeaders />

      <div className="spm-container">
        {availablePlayers.map((player, idx) => getPlayerRow(player, idx))}
      </div>
    </ModalTemplate>
  );
};

export default ShortlistPickModal;
