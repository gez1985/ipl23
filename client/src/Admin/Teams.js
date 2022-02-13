import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import { TeamsContext } from "../Store";
import { Button, Modal, Form, Col } from "react-bootstrap";
import Search from "./utils/search";
import deleteIcon from "./images/deleteIcon.png";
import editIcon from "./images/editIcon.png";
import sortObjectsArray from "sort-objects-array";

export default function Teams() {
  const [teams, setTeams] = useContext(TeamsContext);
  const [team, setTeam] = useState({ name: "" });
  const [showEditTeam, setShowEditTeam] = useState(false);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [searchName, setSearchName] = useState("");
  let teamsList = [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!teams) {
    return (
      <>
        <LoadingSpinner loading={true} />
      </>
    );
  }

  if (teams) {
    const namedTeams = teams.filter((team) =>
      team.name.toLowerCase().includes(searchName.toLowerCase())
    );
    teamsList = sortObjectsArray(namedTeams, "name");
  }

  function handleAddTeamClick() {
    setShowAddTeam(true);
  }

  function handleAddTeamCancel() {
    setTeam({ name: "" });
    setShowAddTeam(false);
  }

  function handleDeleteClick(team) {
    const uneditedTeam = JSON.parse(JSON.stringify(team));
    setTeam(uneditedTeam);
    setShowConfirmDelete(true);
  }

  function handleConfirmDeleteCancel() {
    setTeam({ name: "" });
    setShowConfirmDelete(false);
  }

  function handleEditClick(team) {
    const uneditedTeam = JSON.parse(JSON.stringify(team));
    setTeam(uneditedTeam);
    setShowEditTeam(true);
  }

  function handleEditTeamCancel() {
    setTeam({ name: "" });
    setShowEditTeam(false);
  }

  function handleNameChange(e) {
    let updatedTeam = team;
    updatedTeam.name = e.target.value;
    setTeam(updatedTeam);
  }

  async function updateTeam() {
    const updatedTeam = await Search.putTeam(team);
    const newArray = teams.filter((t) => t.id !== updatedTeam.id);
    newArray.push(updatedTeam);
    setTeams(newArray);
    setShowEditTeam(false);
    setTeam({ name: "" });
  }

  async function addTeam() {
    const newTeam = await Search.postTeam(team);
    const newArray = teams;
    newArray.push(newTeam);
    setTeams(newArray);
    setShowAddTeam(false);
    setTeam({ name: "" });
  }

  function deleteTeam() {
    Search.deleteTeam(team.id);
    const newArray = teams.filter((t) => t.id !== team.id);
    setTeams(newArray);
    setShowConfirmDelete(false);
  }

  function renderEditTeamModal() {
    return (
      <>
        <Modal
          show={showEditTeam}
          onHide={handleEditTeamCancel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit {team.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Group controlId="name" onChange={handleNameChange}>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={team.name}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditTeamCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={updateTeam}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function renderAddTeamModal() {
    return (
      <>
        <Modal
          show={showAddTeam}
          onHide={handleAddTeamCancel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Group controlId="name" onChange={handleNameChange}>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={team.name}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddTeamCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={addTeam}>
              Add Team
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function renderConfirmDeleteModal() {
    return (
      <>
        <Modal
          show={showConfirmDelete}
          onHide={handleConfirmDeleteCancel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete {team.name}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleConfirmDeleteCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteTeam}>
              Delete Team
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function renderTableRows(team) {
    return (
      <tr key={team.id}>
        <td>{team.id}</td>
        <td>{team.name}</td>
        <td>
          <div className="edit-button" onClick={() => handleEditClick(team)}>
            <img src={editIcon} alt="edit-team" />
          </div>
        </td>
        <td>
          <div className="edit-button" onClick={() => handleDeleteClick(team)}>
            <img src={deleteIcon} alt="delete-team" />
          </div>
        </td>
      </tr>
    );
  }

  return (
    <>
      {renderEditTeamModal()}
      {renderAddTeamModal()}
      {renderConfirmDeleteModal()}
      <Header />
      <div className="add-search-container">
        <input
          type="text"
          placeholder="Search by name:"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleAddTeamClick}>
          Add Team
        </button>
      </div>
      <div className="tables-container">
        <table className="teams-table">
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Edit Team</th>
            <th>Delete Team</th>
          </tr>
          {teamsList.map((team) => renderTableRows(team))}
        </table>
      </div>
    </>
  );
}
