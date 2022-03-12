import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import { ManagersContext, LeagueContext, ManagerContext } from "../Store";
import { Button, Modal, Form, Col } from "react-bootstrap";
import Search from "./utils/search";
import deleteIcon from "./images/deleteIcon.png";
import editIcon from "./images/editIcon.png";
import sortObjectsArray from "sort-objects-array";
import SquadModal from "./SquadModal";
import viewEye from "./images/viewEye.png";
import Helpers from "./utils/Helpers";

export default function Managers() {
  const [manager] = useContext(ManagerContext);
  const [league] = useContext(LeagueContext);
  const [managers, setManagers] = useContext(ManagersContext);
  const [managerData, setManagerData] = useState({ name: "", adminLevel: 1 });
  const [showEditManager, setShowEditManager] = useState(false);
  const [showAddManager, setShowAddManager] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [searchName, setSearchName] = useState("");
  const [squadArray, setSquadArray] = useState();
  const [stage, setStage] = useState();
  const [showSquad, setShowSquad] = useState(false);
  let managersList = [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getAllManagers = () => {}

  if (!managers || !league || !manager) {
    return (
      <>
        <LoadingSpinner loading={true} />
      </>
    );
  }

  if (managers && league && manager) {
    let namedManagers = [];
    const leagueManagers = [];
    league.managerIds.forEach((id) =>
      leagueManagers.push(Helpers.getObjectById(managers, id))
    );
    if (manager.adminLevel !== 4) {
      namedManagers = leagueManagers.filter((manager) =>
        manager.name.toLowerCase().includes(searchName.toLowerCase())
      );
    } else {
      namedManagers = managers.filter((manager) =>
        manager.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    switch (sortBy) {
      case "name":
        managersList = sortObjectsArray(namedManagers, "name");
        break;
      case "adminLevel":
        managersList = sortObjectsArray(namedManagers, "adminLevel", "desc");
        break;
      case "pickNumber":
        managersList = sortObjectsArray(namedManagers, "pickNumber");
        break;
      default:
        managersList = sortObjectsArray(namedManagers, "name");
    }
  }

  function handleSquadClick(stage, squad, manager) {
    const uneditedManager = JSON.parse(JSON.stringify(manager));
    setManagerData(uneditedManager);
    if (squad) {
      setSquadArray(squad);
    } else {
      setSquadArray([]);
    }
    setShowSquad(true);
    setStage(stage);
  }

  function resetSquadArray() {
    setManagerData({ name: "", adminLevel: 1 });
    setShowSquad(false);
    setSquadArray();
  }

  function handleAddManagerClick() {
    setShowAddManager(true);
  }

  function handleAddManagerCancel() {
    setManagerData({ name: "", adminLevel: 1 });
    setShowAddManager(false);
  }

  function handleDeleteClick(manager) {
    const uneditedManager = JSON.parse(JSON.stringify(manager));
    setManagerData(uneditedManager);
    setShowConfirmDelete(true);
  }

  function handleConfirmDeleteCancel() {
    setManagerData({ name: "", adminLevel: 1 });
    setShowConfirmDelete(false);
  }

  function handleEditClick(manager) {
    const uneditedManager = JSON.parse(JSON.stringify(manager));
    setManagerData(uneditedManager);
    setShowEditManager(true);
  }

  function handleEditManagerCancel() {
    setManagerData({ name: "", adminLevel: 1 });
    setShowEditManager(false);
  }

  function handleNameChange(e) {
    let updatedManager = managerData;
    updatedManager.name = e.target.value;
    setManagerData(updatedManager);
  }

  function handleTeamNameChange(e) {
    let updatedManager = managerData;
    updatedManager.teamName = e.target.value;
    setManagerData(updatedManager);
  }

  function handleUserIdChange(e) {
    let updatedManager = managerData;
    updatedManager.userId = e.target.value;
    setManagerData(updatedManager);
  }

  function handleAdminLevelChange(e) {
    let updatedManager = managerData;
    updatedManager.adminLevel = e.target.value;
    setManagerData(updatedManager);
  }

  async function updateManager() {
    const updatedManager = await Search.putManager(managerData);
    const newArray = managers.filter((man) => man.id !== updatedManager.id);
    newArray.push(updatedManager);
    setManagers(newArray);
    setShowEditManager(false);
    setManagerData({ name: "", adminLevel: 1 });
  }

  async function addManager() {
    const newManager = await Search.postManager(managerData);
    const newArray = managers;
    newArray.push(newManager);
    setManagers(newArray);
    setShowAddManager(false);
    setManagerData({ name: "", adminLevel: 1 });
  }

  function deleteManager() {
    Search.deleteManager(managerData.id);
    const newArray = managers.filter((man) => man.id !== managerData.id);
    setManagers(newArray);
    setShowConfirmDelete(false);
  }

  function renderEditManagerModal() {
    if (managerData) {
      return (
        <>
          <Modal
            show={showEditManager}
            onHide={handleEditManagerCancel}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit {managerData.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="name" onChange={handleNameChange}>
                      <Form.Label>Name:</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={managerData.name}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group
                      controlId="teamName"
                      onChange={handleTeamNameChange}
                    >
                      <Form.Label>Team Name:</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={managerData.teamName}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group
                      controlId="userId"
                      onChange={handleUserIdChange}
                    >
                      <Form.Label>User ID:</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={managerData.userId}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group
                      controlId="adminLevel"
                      onChange={handleAdminLevelChange}
                    >
                      <Form.Label>Admin Level:</Form.Label>
                      <Form.Control
                        as="select"
                        defaultValue={managerData.adminLevel}
                      >
                        <option key="1" value="1">
                          1
                        </option>
                        <option key="2" value="2">
                          2
                        </option>
                        <option key="3" value="3">
                          3
                        </option>
                        <option key="4" value="4">
                          4
                        </option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditManagerCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={updateManager}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    return null;
  }

  function renderAddManagerModal() {
    return (
      <>
        <Modal
          show={showAddManager}
          onHide={handleAddManagerCancel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add manager</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Group controlId="name" onChange={handleNameChange}>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group
                    controlId="teamName"
                    onChange={handleTeamNameChange}
                  >
                    <Form.Label>Team Name:</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="userId" onChange={handleUserIdChange}>
                    <Form.Label>User ID:</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group
                    controlId="adminLevel"
                    onChange={handleAdminLevelChange}
                  >
                    <Form.Label>Admin Level:</Form.Label>
                    <Form.Control as="select" defaultValue="1">
                      <option key="0" value={null}></option>
                      <option key="1" value="1">
                        1
                      </option>
                      <option key="2" value="2">
                        2
                      </option>
                      <option key="3" value="3">
                        3
                      </option>
                      <option key="4" value="4">
                        4
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddManagerCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={addManager}>
              Add Manager
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function renderConfirmDeleteModal() {
    if (managerData) {
      return (
        <>
          <Modal
            show={showConfirmDelete}
            onHide={handleConfirmDeleteCancel}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete {managerData.name}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleConfirmDeleteCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={deleteManager}>
                Delete Manager
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

  function renderTableRows(managerIn) {
    return (
      <tr key={managerIn.id}>
        <td>{managerIn.id}</td>
        <td>{managerIn.name}</td>
        <td>{managerIn.teamName}</td>
        {manager.adminLevel === 4 && <td>{managerIn.userId}</td>}
        <td>{managerIn.adminLevel}</td>
        <td>{managerIn.pickNumber}</td>
        <td
          className="sort-heading"
          onClick={() => handleSquadClick(1, managerIn.stage1Squad, managerIn)}
        >
          <img src={viewEye} alt="view-squad" />
        </td>
        <td
          className="sort-heading"
          onClick={() => handleSquadClick(2, managerIn.stage2Squad, managerIn)}
        >
          <img src={viewEye} alt="view-squad" />
        </td>
        <td
          className="sort-heading"
          onClick={() => handleSquadClick(3, managerIn.stage3Squad, managerIn)}
        >
          <img src={viewEye} alt="view-squad" />
        </td>
        {manager.adminLevel === 4 && (
          <>
            <td>
              <div
                className="edit-button"
                onClick={() => handleEditClick(managerIn)}
              >
                <img src={editIcon} alt="edit-manager" />
              </div>
            </td>
            <td>
              <div
                className="edit-button"
                onClick={() => handleDeleteClick(managerIn)}
              >
                <img src={deleteIcon} alt="delete-manager" />
              </div>
            </td>
          </>
        )}
      </tr>
    );
  }

  return (
    <>
      {renderEditManagerModal()}
      {renderAddManagerModal()}
      {renderConfirmDeleteModal()}
      <Header />
      <div className="add-search-container">
        <input
          type="text"
          placeholder="Search by name:"
          onChange={(e) => setSearchName(e.target.value)}
        />
        {manager.adminLevel === 4 && (
          <button onClick={handleAddManagerClick}>Add Manager</button>
        )}
      </div>
      <div className="tables-container">
        <table className="managers-table">
          <tbody>
            <tr>
              <th>id</th>
              <th className="sort-heading" onClick={() => setSortBy("name")}>
                Name
              </th>
              <th>Team Name</th>
              {manager.adminLevel === 4 && <th>User ID</th>}
              <th
                className="sort-heading"
                onClick={() => setSortBy("adminLevel")}
              >
                Admin Level
              </th>
              <th
                className="sort-heading"
                onClick={() => setSortBy("pickNumber")}
              >
                Pick Number
              </th>
              <th>Stage 1 Squad</th>
              <th>Stage 2 Squad</th>
              <th>Stage 3 Squad</th>
              {manager.adminLevel === 4 && (
                <>
                  <th>Edit Manager</th>
                  <th>Delete Manager</th>
                </>
              )}
            </tr>
            {managersList.map((manager) => renderTableRows(manager))}
          </tbody>
        </table>
      </div>
      {showSquad && (
        <SquadModal
          show={showSquad}
          squad={squadArray}
          hide={resetSquadArray}
          stage={stage}
          manager={managerData}
        />
      )}
    </>
  );
}
