import React, { useContext, useState } from "react";
import { ManagerContext, PlayersContext } from "../Store";
import ModalTemplate from "../ModalTemplate";
import Search from "../utils/search";

const AutoModal = ({ close, title, player }) => {
  const [manager, setManager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  const [loading, setLoading] = useState(false);
  console.log({ manager });

  const handleAddInitialPlayerClick = async () => {
    console.log(`handle add inital player clicked`);
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
    close()
  };

  const getEmptyShortlist = () => {
    return (
      <div>
        <p>Your shortlist is empty</p>
        <p>Add {player.name} to your shortlist?</p>
        <button onClick={handleAddInitialPlayerClick}>Yes</button>
        <button onClick={close}>No</button>
      </div>
    );
  };

  const getAutoSort = () => {
    return <div>Sort content here</div>;
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
