import React, { useContext } from "react";
import ModalTemplate from "../ModalTemplate";
import { ManagerContext, PlayersContext } from "../Store";

const ShortlistPickModal = ({ closeModal }) => {
  const [players] = useContext(PlayersContext);
  const [manager, setManager] = useContext(ManagerContext);

  console.log({ manager });

  const availablePlayers = players.filter((player) => player);

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
    console.log({ player });
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
          Pick player
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
