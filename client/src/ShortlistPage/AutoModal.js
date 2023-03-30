import React, { useContext, useState } from "react";
import { ManagerContext, PlayersContext } from "../Store";
import ModalTemplate from "../ModalTemplate";
import Search from "../utils/search";
import AutoSortComponent from "./AutoSortComponent";

const AutoModal = ({ close, title, player }) => {
  const [manager, setManager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  const [loading, setLoading] = useState(false);

  const handleAddInitialPlayerClick = async () => {
    setLoading(true);
    try {
      const managerCopy = JSON.parse(JSON.stringify(manager));
      managerCopy.shortlist.push(player.id);
      await Search.putManager(managerCopy);
      setManager(managerCopy);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
    close();
  };

  const getEmptyShortlist = () => {
    return (
      <div>
        <p className="shortlist-page-auto-modal-empty-caption">
          Your shortlist is empty
        </p>
        <p className="shortlist-page-auto-modal-empty-caption">
          Add {player.name} to your shortlist?
        </p>
        <button
          className="slp-auto-modal-btn slp-green"
          onClick={handleAddInitialPlayerClick}
        >
          Yes
        </button>
        <button className="slp-auto-modal-btn" onClick={close}>
          No
        </button>
      </div>
    );
  };

  const getAutoSort = () => {
    if (player) {
      return <AutoSortComponent playerId={player.id} close={close} />;
    }
    return false;
  };

  return (
    <div>
      <ModalTemplate closeModal={close} title={title}>
        {manager.shortlist.length > 0 ? getAutoSort() : getEmptyShortlist()}
      </ModalTemplate>
    </div>
  );
};

export default AutoModal;
