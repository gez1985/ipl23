import React, { useContext, useState } from "react";
import Helpers from "./utils/Helpers";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { ManagersContext, PlayersContext } from "../Store";
import Search from "./utils/search";

export default function SquadModal(props) {
  const [managers, setManagers] = useContext(ManagersContext);
  const [players] = useContext(PlayersContext);
  const [edit, setEdit] = useState(false);
  const [addPlayer, setAddPlayer] = useState(false);
  const [playerToAdd, setPlayerToAdd] = useState();

  async function handlePlayerDelete(playerId) {
    const uneditedManager = JSON.parse(JSON.stringify(props.manager));
    let playerArray = [];
    if (props.stage === 1) {
      playerArray = uneditedManager.stage1Squad;
    } else if (props.stage === 2) {
      playerArray = uneditedManager.stage2Squad;
    } else if (props.stage === 3) {
      playerArray = uneditedManager.stage3Squad;
    }
    const newArray = playerArray.filter((id) => id !== playerId);
    if (props.stage === 1) {
      uneditedManager.stage1Squad = newArray;
    } else if (props.stage === 2) {
      uneditedManager.stage2Squad = newArray;
    } else if (props.stage === 3) {
      uneditedManager.stage3Squad = newArray;
    }
    const updatedManager = await Search.putManager(uneditedManager);
    const updatedArray = managers.filter((man) => man.id !== updatedManager.id);
    updatedArray.push(updatedManager);
    setManagers(updatedArray);
    props.hide();
  }

  function handleAddPlayerClick() {
    setAddPlayer(!addPlayer);
  }

  async function handleAddPlayer() {
    const uneditedManager = JSON.parse(JSON.stringify(props.manager));
    if (props.stage === 1) {
      uneditedManager.stage1Squad.push(playerToAdd);
    } else if (props.stage === 2) {
      uneditedManager.stage2Squad.push(playerToAdd);
    } else if (props.stage === 3) {
      uneditedManager.stage3Squad.push(playerToAdd);
    }
    const updatedManager = await Search.putManager(uneditedManager);
    const updatedArray = managers.filter((man) => man.id !== updatedManager.id);
    updatedArray.push(updatedManager);
    setManagers(updatedArray);
    setAddPlayer(false);
    props.hide();
  }

  function renderPlayerSelectOptions(player) {
    return (
      <option key={player.id} value={player.id}>
        {player.name}
      </option>
    );
  }

  function renderAddPlayerEntry() {
    if (addPlayer) {
      return (
        <Form.Row>
          <Col>
            <Form.Group controlId="add-player">
              <Form.Control
                as="select"
                onChange={(e) => setPlayerToAdd(e.target.value)}
              >
                <option key="0" value={null}></option>
                {players.map((player) => renderPlayerSelectOptions(player))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Button variant="success" onClick={handleAddPlayer}>
              Add
            </Button>
          </Col>
        </Form.Row>
      );
    }
    return null;
  }

  function renderPlayerRows(playerId) {
    const name = Helpers.getNameById(players, playerId);
    return (
      <>
        <Form.Row key={playerId}>
          <Col>
            <Form.Group controlId={name}>
              <Form.Control
                type="text"
                defaultValue={name}
                readOnly
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {edit && (
              <Button
                variant="danger"
                onClick={() => handlePlayerDelete(playerId)}
              >
                Delete
              </Button>
            )}
          </Col>
        </Form.Row>
      </>
    );
  }

  function renderSquadModal() {
    return (
      <>
        <Modal
          show={props.show}
          onHide={props.hide}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{props.manager.name} - Stage {props.stage} Squad:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {props.squad.map((playerId) => renderPlayerRows(playerId))}
              {renderAddPlayerEntry()}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.hide}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddPlayerClick}>
              Add Player
            </Button>
            <Button variant="danger" onClick={() => setEdit(!edit)}>
              Remove Players {edit ? "ON" : "OFF"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return <>{renderSquadModal()}</>;
}
