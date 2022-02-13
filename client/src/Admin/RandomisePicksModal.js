import React, { useContext, useEffect, useState } from "react";
import Helpers from "./utils/Helpers";
import { Button, Modal, Form } from "react-bootstrap";
import { LeagueContext, ManagersContext } from "../Store";
import Search from "./utils/search";

export default function RandomisePicksModal(props) {
  const [league, setLeague] = useContext(LeagueContext);
  const [managers] = useContext(ManagersContext);
  const [managerIds, setManagerIds] = useState([]);
  const [render, setRender] = useState(true);

  useEffect(() => {
    const initialIds = JSON.parse(JSON.stringify(league.managerIds));
    setManagerIds(initialIds);
  }, []);

  function shuffle(array) {
    let m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  async function saveNewOrder() {
    const editedLeague = JSON.parse(JSON.stringify(league));
    editedLeague.managerIds = managerIds;
    const updatedLeague = await Search.putLeague(editedLeague);
    setLeague(updatedLeague);
    props.hide();
  }

  function handleRandomiseClick() {
    setRender(!render);
    const newOrder = shuffle(managerIds);
    setManagerIds(newOrder);
  }

  function renderManagerList(managerId, managerIndex) {
    const manager = Helpers.getObjectById(managers, managerId);
    return (
      <div key={manager.id}>
        {managerIndex + 1} {manager.name}
      </div>
    );
  }

  function renderRandomisePicksModal() {
    return (
      <>
        <Modal show onHide={props.hide}>
          <Modal.Header closeButton>
            <Modal.Title>Randomise Pick Numbers:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {managerIds.map((managerId, managerIndex) =>
                renderManagerList(managerId, managerIndex)
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleRandomiseClick}>
              Randomise
            </Button>
            <Button variant="danger" onClick={saveNewOrder}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return <>{renderRandomisePicksModal()}</>;
}
