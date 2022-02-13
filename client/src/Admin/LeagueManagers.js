import React, { useContext, useState, useEffect } from "react";
import Helpers from "./utils/Helpers";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { LeaguesContext, LeagueContext, ManagersContext } from "../Store";
import Search from "./utils/search";

export default function LeagueManagers(props) {
  const [leagues] = useContext(LeaguesContext);
  const [league, setLeague] = useContext(LeagueContext);
  const [managers] = useContext(ManagersContext);
  const [array, setArray] = useState([]);
  const [addArray, setAddArray] = useState([]);
  const [addManager, setAddManager] = useState(false);
  const [newManager, setNewManager] = useState();
  const [deleteManagers, setDeleteManagers] = useState(false);

  useEffect(() => {
      setArray(league.managerIds);
  }, []);

  async function saveChanges() {
    const newArray = array.concat(addArray);
    const editedLeague = JSON.parse(JSON.stringify(league));
    editedLeague.managerIds = newArray;
    const updatedLeague = await Search.putLeague(editedLeague);
    setLeague(updatedLeague);
    props.hide();
  }

  function addManagerClick() {
    if (!newManager) {
      alert("select a manager");
      return;
    }
    addArray.push(Number(newManager));
    setNewManager();
    setAddManager(false);
  }


  function renderManagerSelectOptions(manager) {
    return (
      <option key={manager.id} value={manager.id}>
        {manager.name}
      </option>
    );
  }

  function removeManager(managerId) {
    const arrayIndex = array.indexOf(managerId);
    const addArrayIndex = addArray.indexOf(managerId);
    if (arrayIndex !== -1) {
      const newArray = array;
      newArray.splice(arrayIndex, 1);
      setArray(newArray);
      setDeleteManagers(!deleteManagers);
    }
    if (addArrayIndex !== -1) {
      const newArray = addArray;
      newArray.splice(addArrayIndex, 1);
      setAddArray(newArray);
      setDeleteManagers(!deleteManagers);
    }
  }

  function addManagers() {
    let assignedManagers = [];
    leagues.forEach(league => {
      league.managerIds.forEach(id => assignedManagers.push(id));
    });
    addArray.forEach(id => assignedManagers.push(id));
    array.forEach(id => assignedManagers.push(id));
    const unassignedManagers = managers.filter(manager => !assignedManagers.includes(manager.id));
    if (addManager) {
      return (
        <Form.Row>
          <Col>
            <Form.Group controlId="add-manager">
              <Form.Control
                as="select"
                onChange={(e) => setNewManager(e.target.value)}
              >
                <option key="0" value={null}></option>
                {unassignedManagers.map((manager) => renderManagerSelectOptions(manager))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Button variant="success" onClick={addManagerClick}>
              Add
            </Button>
          </Col>
        </Form.Row>
      );
    }
    return null;
  }

  function renderRows(managerId) {
    const name = Helpers.getNameById(managers, managerId);
    return (
      <>
        <Form>
          <Form.Row key={managerId}>
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
              {deleteManagers && (
                <Button variant="danger" onClick={() => removeManager(managerId)}>
                  Delete
                </Button>
              )}
            </Col>
          </Form.Row>
        </Form>
      </>
    );
  }

  function renderModal() {
    return (
      <>
        <Modal show onHide={props.hide} backdrop="static" keyboard={false} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{props.from}:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {array.map(managerId => renderRows(managerId))}
              {addArray.map(managerId => renderRows(managerId))}
              {addManagers()}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setDeleteManagers(!deleteManagers)}>
              Remove Manager
            </Button>
            <Button
              variant="success"
              onClick={() => setAddManager(!addManager)}
            >
              Add Manager
            </Button>
            <Button variant="primary" onClick={saveChanges}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return <>{renderModal()}</>;
}
