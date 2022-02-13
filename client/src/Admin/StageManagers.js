import React, { useContext, useState, useEffect } from "react";
import Helpers from "./utils/Helpers";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { ManagersContext, LeagueContext } from "../Store";
import Search from "./utils/search";

export default function StageManagers(props) {
  const [league, setLeague] = useContext(LeagueContext);
  const [managers] = useContext(ManagersContext);
  const [array, setArray] = useState([]);
  const [addArray, setAddArray] = useState([]);
  const [addManager, setAddManager] = useState(false);
  const [homeManager, setHomeManager] = useState();
  const [awayManager, setAwayManager] = useState();
  const [deleteManagers, setDeleteManagers] = useState(false);

  useEffect(() => {
    if (props.from === "Stage 2 Managers") {
      setArray(league.stage2Managers);
    } else if (props.from === "Stage 3 Managers") {
      setArray(league.stage3Managers);
    } else if (props.from === "Stage 4 Managers") {
      setArray(league.stage4Managers);
    } 
  }, []);

  function renderManagerSelectOptions(manager) {
    return (
      <option key={manager.id} value={manager.id}>
        {manager.name}
      </option>
    );
  }

  async function saveChanges() {
    const newArray = array.concat(addArray);
    const editedLeague = JSON.parse(JSON.stringify(league));
    if (props.from === "Stage 2 Managers") {
      editedLeague.stage2Managers = newArray;
    } else if (props.from === "Stage 3 Managers") {
      editedLeague.stage3Managers = newArray;
    } else if (props.from === "Stage 4 Managers") {
      editedLeague.stage4Managers = newArray;
    }
    const updatedLeague = await Search.putLeague(editedLeague);
    setLeague(updatedLeague);
    props.hide();
  }

  function addManagersClick() {
    if (!homeManager || !awayManager) {
      alert("ensure two managers are selected");
      return;
    }
    const managersToAdd = [Number(homeManager), Number(awayManager)];
    addArray.push(managersToAdd);
    setHomeManager();
    setAwayManager();
    setAddManager(false);
  }

  function removeManagers(arr) {
    const arrayIndex = array.indexOf(arr);
    const addArrayIndex = addArray.indexOf(arr);
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
    let availableManagers = [];
    let selectedManagers = [];
    array.forEach(arr => {
      arr.forEach(id => selectedManagers.push(id));
    });
    addArray.forEach(arr => {
      arr.forEach(id => selectedManagers.push(id));
    });
    const unselectedManagerIds = league.managerIds.filter(id => !selectedManagers.includes(id));
    unselectedManagerIds.forEach(id => availableManagers.push(Helpers.getObjectById(managers, id)));
    if (addManager) {
      return (
        <Form.Row>
          <Col>
            <Form.Group controlId="add-manager1">
              <Form.Control
                as="select"
                onChange={(e) => setHomeManager(e.target.value)}
              >
                <option key="0" value={null}></option>
                {availableManagers.map((manager) => renderManagerSelectOptions(manager))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="add-manager2">
              <Form.Control
                as="select"
                onChange={(e) => setAwayManager(e.target.value)}
              >
                <option key="0" value={null}></option>
                {availableManagers.map((manager) => renderManagerSelectOptions(manager))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Button variant="success" onClick={addManagersClick}>
              Add
            </Button>
          </Col>
        </Form.Row>
      );
    }
    return null;
  }

  function renderRows(arr) {
    const homeName = Helpers.getNameById(managers, arr[0]);
    const awayName = Helpers.getNameById(managers, arr[1]);
    return (
      <>
        <Form.Row key={arr[0]}>
          <Col>
            <Form.Group controlId={homeName}>
              <Form.Control
                type="text"
                defaultValue={homeName}
                readOnly
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId={awayName}>
              <Form.Control
                type="text"
                defaultValue={awayName}
                readOnly
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {deleteManagers && (
              <Button variant="danger" onClick={() => removeManagers(arr)}>
                Delete
              </Button>
            )}
          </Col>
        </Form.Row>
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
              {array.map((arr) => renderRows(arr))}
              {addArray.map((arr) => renderRows(arr))}
              {addManagers()}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => setAddManager(!addManager)}
            >
              Add Managers
            </Button>
            <Button
              variant="danger"
              onClick={() => setDeleteManagers(!deleteManagers)}
            >
              Remove Managers
            </Button>
            <Button variant="primary" onClick={saveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return <>{renderModal()}</>;
}
