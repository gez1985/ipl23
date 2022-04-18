import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function DrawSemiSquadsModal({ hide, from }) {
  const handleDrawSquads = () => {
    if (from === "semi") {
      console.log("draw semi squads clicked");
    } else if (from === "final") {
      console.log("draw final squads clicked");
    } else {
      alert("error with from prop");
    }
    hide();
  };

  return (
    <>
      <Modal show onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Draw {from} squads:</Modal.Title>
        </Modal.Header>
        <Modal.Body>Have you set the {from} teams and managers?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDrawSquads}>
            Draw Squads
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
