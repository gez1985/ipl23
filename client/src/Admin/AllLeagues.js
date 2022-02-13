import React, { useState, useContext, useEffect } from "react";
import { LeaguesContext, ManagersContext } from "../Store";
import Header from "./Header";
import Search from "./utils/search";
import LoadingSpinner from "./LoadingSpinner";
import deleteIcon from "./images/deleteIcon.png";
import editIcon from "./images/editIcon.png";
import { Button, Modal, Form, Col } from "react-bootstrap";
import Helpers from "./utils/Helpers";

export default function AllLeagues() {
  const [searchName, setSearchName] = useState("");
  const [leagues, setLeagues] = useContext(LeaguesContext);
  const [managers] = useContext(ManagersContext);
  const [league, setLeague] = useState({ name: "", managerIds: [] });
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let leaguesList = [];

  if (!leagues || !managers) {
    return (
      <>
        <LoadingSpinner loading={true} />
      </>
    );
  }

  if (leagues) {
    leaguesList = leagues.filter((league) =>
      league.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }

  function handleDeleteClick(league) {
    setLeague(league);
    setShowConfirmDelete(true);
  }

  function handleEditClick(league) {
    setLeague(league);
    setShowEdit(true);
  }

  function handleCancel() {
    setLeague({ name: "", managerIds: [] });
    setShowAdd(false);
    setShowEdit(false);
    setShowConfirmDelete(false);
  }

  function handleNameChange(e) {
    let updatedLeague = JSON.parse(JSON.stringify(league));
    updatedLeague.name = e.target.value;
    setLeague(updatedLeague);
  }

  function handleAdminChange(e) {
    let updatedLeague = JSON.parse(JSON.stringify(league));
    updatedLeague.adminManagerId = Number(e.target.value);
    setLeague(updatedLeague);
  }

  async function addLeague() {
    let leagueToAdd = JSON.parse(JSON.stringify(league));
    leagueToAdd.managerIds = [league.adminManagerId];
    const newLeague = await Search.postLeague(leagueToAdd);
    const newArray = leagues;
    newArray.push(newLeague);
    setLeagues(newArray);
    setShowAdd(false);
    setLeague({ name: "", managerIds: [] });
  }

  async function updateLeague() {
    const updatedLeague = await Search.putLeague(league);
    const newArray = leagues.filter((lea) => lea.name !== league.name);
    newArray.push(updatedLeague);
    setLeagues(newArray);
    setShowEdit(false);
    setLeague({ name: "", managerIds: [] });
  }

  async function deleteLeague() {
    Search.deleteLeague(league.name);
    const newArray = leagues.filter((lea) => lea.name !== league.name);
    setLeagues(newArray);
    setShowConfirmDelete(false);
    setLeague({ name: "", managerIds: [] });
  }

  function renderManagerSelectOptions(manager) {
    return (
      <option key={manager.id} value={manager.id}>
        {manager.name}
      </option>
    );
  }

  function renderAddLeagueModal() {
    let assignedManagers = [];
    leagues.forEach((league) => {
      league.managerIds.forEach((id) => assignedManagers.push(id));
    });
    const unassignedManagers = managers.filter(
      (manager) => !assignedManagers.includes(manager.id)
    );
    return (
      <>
        <Modal
          show={showAdd}
          onHide={handleCancel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add League</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Group controlId="name" onChange={handleNameChange}>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={league.name}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="admin" onChange={handleAdminChange}>
                    <Form.Label>League Admin:</Form.Label>
                    <Form.Control as="select">
                      <option key="0" value={0}></option>
                      {unassignedManagers.map((manager) =>
                        renderManagerSelectOptions(manager)
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={addLeague}>
              Add League
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function renderEditLeagueModal() {
    let leagueManagers = [];
    league.managerIds.forEach((id) =>
      leagueManagers.push(Helpers.getObjectById(managers, id))
    );
    return (
      <>
        <Modal
          show={showEdit}
          onHide={handleCancel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit {league.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={league.name}
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="admin" onChange={handleAdminChange}>
                    <Form.Label>League Admin:</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={league.adminManagerId}
                    >
                      {leagueManagers.map((manager) =>
                        renderManagerSelectOptions(manager)
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={updateLeague}>
              Save Changes
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
          onHide={handleCancel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete {league.name}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteLeague}>
              Delete League
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function renderTableRows(league) {
    return (
      <tr>
        <td>{league.id}</td>
        <td>{league.name}</td>
        <td>{Helpers.getNameById(managers, league.adminManagerId)}</td>
        <td>
          <div className="edit-button" onClick={() => handleEditClick(league)}>
            <img
              src={editIcon}
              alt="edit-league"
              onClick={() => handleEditClick(league)}
            />
          </div>
        </td>
        <td>
          <div
            className="edit-button"
            onClick={() => handleDeleteClick(league)}
          >
            <img src={deleteIcon} alt="delete-league" />
          </div>
        </td>
      </tr>
    );
  }

  return (
    <>
      {renderAddLeagueModal()}
      {renderEditLeagueModal()}
      {renderConfirmDeleteModal()}
      <Header />
      <div className="add-search-container">
        <input
          type="text"
          placeholder="Search by name:"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={() => setShowAdd(true)}>
          Add League
        </button>
      </div>
      <div className="tables-container">
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Admin</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {leaguesList.map((league) => renderTableRows(league))}
        </table>
      </div>
    </>
  );
}
