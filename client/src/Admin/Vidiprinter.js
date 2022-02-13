import React, { useState, useContext } from "react";
import { VidiprinterContext, LeagueContext } from "../Store";
import { Button, Modal } from "react-bootstrap";
import Search from "./utils/search";

export default function Vidiprinter(props) {
  const [vidiprinter, setVidiprinter] = useContext(VidiprinterContext);
  const [league] = useContext(LeagueContext);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!vidiprinter || !league) {
    return null;
  }

  async function clearVidiprinter() {
    await Search.deleteVidiprinter(league.id);
    const newArray = vidiprinter.filter((vidi) => vidi.leagueId !== league.id);
    setVidiprinter(newArray);
    setShowConfirm(false);
  }

  function renderConfirmDeleteModal() {
    return (
      <>
        <Modal
          show={showConfirm}
          onHide={() => setShowConfirm(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Clear Vidi for {league.name}?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={clearVidiprinter}>
              Clear Vidi
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <div className="logout-container">
      {renderConfirmDeleteModal()}
      <button
        className="clear-vidiprinter"
        onClick={() => setShowConfirm(true)}
      >
        Clear Vidi
      </button>
    </div>
  );
}
