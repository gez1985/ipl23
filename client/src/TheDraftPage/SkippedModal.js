import { Button, Modal } from "react-bootstrap";

export default function SkippedModal({ closeModal }) {
  return (
    <Modal show onHide={closeModal} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Time Up!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Sorry, you have been skipped</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={closeModal}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
