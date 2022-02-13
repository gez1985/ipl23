import React, { useContext, useState, useEffect } from "react";
import Helpers from "./utils/Helpers";
import { Button, Modal, Form, Col } from "react-bootstrap";
import { LeagueContext, TeamsContext } from "../Store";
import Search from "./utils/search";

export default function StageTeams(props) {
  const [league, setLeague] = useContext(LeagueContext);
  const [teams] = useContext(TeamsContext);
  const [array, setArray] = useState([]);
  const [addArray, setAddArray] = useState([]);
  const [addTeam, setAddTeam] = useState(false);
  const [newTeam, setNewTeam] = useState();
  const [deleteTeams, setDeleteTeams] = useState(false);

  useEffect(() => {
    if (props.from === "Stage 2 Teams") {
      setArray(league.stage2Teams);
    } else if (props.from === "Stage 3 Teams") {
      setArray(league.stage3Teams);
    } else if (props.from === "Stage 4 Teams") {
      setArray(league.stage4Teams);
    }
  }, []);

  async function saveChanges() {
    const newArray = array.concat(addArray);
    const editedLeague = JSON.parse(JSON.stringify(league));
    if (props.from === "Stage 2 Teams") {
      editedLeague.stage2Teams = newArray;
    } else if (props.from === "Stage 3 Teams") {
      editedLeague.stage3Teams = newArray;
    } else if (props.from === "Stage 4 Teams") {
      editedLeague.stage4Teams = newArray;
    }
    const updatedLeague = await Search.putLeague(editedLeague);
    setLeague(updatedLeague);
    props.hide();
  }

  function addTeamClick() {
    if (!newTeam) {
      alert("select a team");
      return;
    }
    addArray.push(Number(newTeam));
    setNewTeam();
    setAddTeam(false);
  }


  function renderTeamSelectOptions(team) {
    return (
      <option key={team.id} value={team.id}>
        {team.name}
      </option>
    );
  }

  function removeTeam(teamId) {
    const arrayIndex = array.indexOf(teamId);
    const addArrayIndex = addArray.indexOf(teamId);
    if (arrayIndex !== -1) {
      const newArray = array;
      newArray.splice(arrayIndex, 1);
      setArray(newArray);
      setDeleteTeams(!deleteTeams);
    }
    if (addArrayIndex !== -1) {
      const newArray = addArray;
      newArray.splice(addArrayIndex, 1);
      setAddArray(newArray);
      setDeleteTeams(!deleteTeams);
    }
  }

  function addTeams() {
    if (addTeam) {
      return (
        <Form.Row>
          <Col>
            <Form.Group controlId="add-team">
              <Form.Control
                as="select"
                onChange={(e) => setNewTeam(e.target.value)}
              >
                <option key="0" value={null}></option>
                {teams.map((team) => renderTeamSelectOptions(team))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Button variant="success" onClick={addTeamClick}>
              Add
            </Button>
          </Col>
        </Form.Row>
      );
    }
    return null;
  }

  function renderRows(teamId) {
    const name = Helpers.getNameById(teams, teamId);
    return (
      <>
        <Form>
          <Form.Row key={teamId}>
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
              {deleteTeams && (
                <Button variant="danger" onClick={() => removeTeam(teamId)}>
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
              {array.map(teamId => renderRows(teamId))}
              {addArray.map(teamId => renderRows(teamId))}
              {addTeams()}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setDeleteTeams(!deleteTeams)}>
              Remove Team
            </Button>
            <Button
              variant="success"
              onClick={() => setAddTeam(!addTeam)}
            >
              Add Team
            </Button>
            <Button variant="primary" onClick={saveChanges}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return <>{renderModal()}</>;
}
