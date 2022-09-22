import React from "react";
import ModalTemplate from "../ModalTemplate";

const ShortlistPickModal = ({ closeModal }) => {
  return (
    <ModalTemplate closeModal={closeModal} title="MY SHORTLIST">
      <div className="spm-container">
        <div className="spm-inner-container"></div>
      </div>
    </ModalTemplate>
  );
};

export default ShortlistPickModal;
