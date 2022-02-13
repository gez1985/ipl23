import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import { PlayersContext, TeamsContext } from "../Store";
import Helpers from "./utils/Helpers";
import { Button, Modal, Form, Col } from "react-bootstrap";
import Search from "./utils/search";
import deleteIcon from "./images/deleteIcon.png";
import editIcon from "./images/editIcon.png";
import sortObjectsArray from "sort-objects-array";

export default function Players() {
  const [players, setPlayers] = useContext(PlayersContext);
  const [teams] = useContext(TeamsContext);
  const [player, setPlayer] = useState();
  const [showEditPlayer, setShowEditPlayer] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [searchName, setSearchName] = useState("");
  let playersList = [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!players || !teams) {
    return (
      <>
        <LoadingSpinner loading={true} />
      </>
    );
  }

  if (players) {
    const namedPlayers = players.filter((player) =>
      player.name.toLowerCase().includes(searchName.toLowerCase())
    );
    switch (sortBy) {
      case "name":
        playersList = sortObjectsArray(namedPlayers, "name");
        break;
      case "role":
        playersList = sortObjectsArray(namedPlayers, "role");
        break;
      case "teamId":
        playersList = sortObjectsArray(namedPlayers, "teamId");
        break;
      default:
        playersList = sortObjectsArray(namedPlayers, "name");
    }
  }

  function handleAddPlayerClick() {
    setShowAddPlayer(true);
  }

  function handleAddPlayerCancel() {
    setPlayer();
    setShowAddPlayer(false);
  }

  function handleDeleteClick(player) {
    const uneditedPlayer = JSON.parse(JSON.stringify(player));
    setPlayer(uneditedPlayer);
    setShowConfirmDelete(true);
  }

  function handleConfirmDeleteCancel() {
    setPlayer();
    setShowConfirmDelete(false);
  }

  function handleEditClick(player) {
    const uneditedPlayer = JSON.parse(JSON.stringify(player));
    setPlayer(uneditedPlayer);
    setShowEditPlayer(true);
  }

  function handleEditPlayerCancel() {
    setPlayer();
    setShowEditPlayer(false);
  }

  function handleNameChange(e) {
    let updatedPlayer = {
      name: ""
    };
    if (player) {
      updatedPlayer = player;
    } 
    updatedPlayer.name = e.target.value;
    setPlayer(updatedPlayer);
  }

  function handleRoleChange(e) {
    let updatedPlayer = {
      role: ""
    };
    if (player) {
      updatedPlayer = player;
    } 
    updatedPlayer.role = e.target.value;
    setPlayer(updatedPlayer);
  }

  function handleTeamIdChange(e) {
    let updatedPlayer = {
      teamId: ""
    };
    if (player) {
      updatedPlayer = player;
    } 
    updatedPlayer.teamId = e.target.value;
    setPlayer(updatedPlayer);
  }

  async function updatePlayer() {
    const updatedPlayer = await Search.putPlayer(player);
    const newArray = players.filter((pla) => pla.id !== updatedPlayer.id);
    newArray.push(updatedPlayer);
    setPlayers(newArray);
    setShowEditPlayer(false);
    setPlayer();
  }

  async function addPlayer() {
    const newPlayer = await Search.postPlayer(player);
    const newArray = players;
    newArray.push(newPlayer);
    setPlayers(newArray);
    setShowAddPlayer(false);
    setPlayer();
  }

  function deletePlayer() {
    Search.deletePlayer(player.id);
    const newArray = players.filter((pla) => pla.id !== player.id);
    setPlayers(newArray);
    setShowConfirmDelete(false);
  }

  function renderTeamOptions(team) {
    return (
      <option key={team.id} value={team.id}>
        {team.name}
      </option>
    );
  }

  function renderEditPlayerModal() {
    if (player) {
      return (
        <>
          <Modal
            show={showEditPlayer}
            onHide={handleEditPlayerCancel}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit {player.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="name" onChange={handleNameChange}>
                      <Form.Label>Name:</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={player.name}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="role" onChange={handleRoleChange}>
                      <Form.Label>Role:</Form.Label>
                      <Form.Control as="select" defaultValue={player.role}>
                        <option key="BT" value="BT">
                          BT
                        </option>
                        <option key="BW" value="BW">
                          BW
                        </option>
                        <option key="AR" value="AR">
                          AR
                        </option>
                        <option key="WK" value="WK">
                          WK
                        </option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="team" onChange={handleTeamIdChange}>
                      <Form.Label>Team:</Form.Label>
                      <Form.Control as="select" defaultValue={player.teamId}>
                        {teams.map((team) => renderTeamOptions(team))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditPlayerCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={updatePlayer}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    return null;
  }

  function renderAddPlayerModal() {
    return (
      <>
        <Modal
          show={showAddPlayer}
          onHide={handleAddPlayerCancel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add player</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Group controlId="name" onChange={handleNameChange}>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="role" onChange={handleRoleChange}>
                    <Form.Label>Role:</Form.Label>
                    <Form.Control as="select">
                      <option key="" value={null} />
                      <option key="BT" value="BT">
                        BT
                      </option>
                      <option key="BW" value="BW">
                        BW
                      </option>
                      <option key="AR" value="AR">
                        AR
                      </option>
                      <option key="WK" value="WK">
                        WK
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="team" onChange={handleTeamIdChange}>
                    <Form.Label>Team:</Form.Label>
                    <Form.Control as="select">
                      <option key="" value={null} />
                      {teams.map((team) => renderTeamOptions(team))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddPlayerCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={addPlayer}>
              Add Player
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function renderConfirmDeleteModal() {
    if (player) {
      return (
        <>
          <Modal
            show={showConfirmDelete}
            onHide={handleConfirmDeleteCancel}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete {player.name}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleConfirmDeleteCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={deletePlayer}>
                Delete Player
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    return null;
  }

  function renderTableRows(player) {
    return (
      <tr key={player.id}>
        <td>{player.id}</td>
        <td>{player.name}</td>
        <td>{player.role}</td>
        <td>{Helpers.getNameById(teams, player.teamId)}</td>
        <td>
          <div className="edit-button" onClick={() => handleEditClick(player)}>
            <img src={editIcon} alt="edit-player" />
          </div>
        </td>
        <td>
          <div
            className="edit-button"
            onClick={() => handleDeleteClick(player)}
          >
            <img src={deleteIcon} alt="delete-player" />
          </div>
        </td>
      </tr>
    );
  }

  return (
    <>
      {renderEditPlayerModal()}
      {renderAddPlayerModal()}
      {renderConfirmDeleteModal()}
      <Header />
      <div className="add-search-container">
        <input
          type="text"
          placeholder="Search by name:"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleAddPlayerClick}>Add Player</button>
      </div>
      <div className="tables-container">
        <table className="players-table">
          <tr>
            <th>id</th>
            <th className="sort-heading" onClick={() => setSortBy("name")}>
              Name
            </th>
            <th className="sort-heading" onClick={() => setSortBy("role")}>
              Role
            </th>
            <th className="sort-heading" onClick={() => setSortBy("teamId")}>
              Team
            </th>
            <th>Edit Player</th>
            <th>Delete Player</th>
          </tr>
          {playersList.map((player) => renderTableRows(player))}
        </table>
      </div>
    </>
  );
}
