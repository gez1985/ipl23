import React, { useContext } from "react";
import { ManagerContext, PlayersContext } from "../Store";
import ModalTemplate from "../ModalTemplate";

const AutoModal = ({ close, title, player }) => {
  const [manager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  console.log({ manager });

  const getEmptyShortlist = () => {
    return (
      <div>
        <p>Your shortlist is empty</p>
        <p>Add {player.name} to your shortlist?</p>
        <button>Yes</button>
        <button>No</button>
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
