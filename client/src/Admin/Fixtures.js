import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import { FixturesContext, TeamsContext } from "../Store";
import Helpers from "./utils/Helpers";
import { Button, Modal, Form, Col } from "react-bootstrap";
import Search from "./utils/search";
import deleteIcon from "./images/deleteIcon.png";
import editIcon from "./images/editIcon.png";
import plusIcon from "./images/plusIcon.png";
import sortObjectsArray from "sort-objects-array";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function Fixtures() {
  const [fixtures, setFixtures] = useContext(FixturesContext);
  const [teams] = useContext(TeamsContext);
  const [fixture, setFixture] = useState();
  const [showEditFixture, setShowEditFixture] = useState(false);
  const [showAddFixture, setShowAddFixture] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  let fixturesList = [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!fixtures || !teams) {
    return (
      <>
        <LoadingSpinner loading={true} />
      </>
    );
  }

  if (fixtures) {
    switch (sortBy) {
      case "homeTeamId":
        fixturesList = sortObjectsArray(fixtures, "homeTeamId");
        break;
      case "awayTeamId":
        fixturesList = sortObjectsArray(fixtures, "awayTeamId");
        break;
      case "date":
        fixturesList = sortObjectsArray(fixtures, "date");
        break;
      default:
        fixturesList = sortObjectsArray(fixtures, "date");
    }
  }

  function handleAddFixtureClick() {
    setShowAddFixture(true);
  }

  function handleAddFixtureCancel() {
    setFixture();
    setShowAddFixture(false);
  }

  function handleDeleteClick(fixture) {
    const uneditedFixture = JSON.parse(JSON.stringify(fixture));
    setFixture(uneditedFixture);
    setShowConfirmDelete(true);
  }

  function handleConfirmDeleteCancel() {
    setFixture();
    setShowConfirmDelete(false);
  }

  function handleEditClick(fixture) {
    const uneditedFixture = JSON.parse(JSON.stringify(fixture));
    setFixture(uneditedFixture);
    setShowEditFixture(true);
  }

  function handleEditFixtureCancel() {
    setFixture();
    setShowEditFixture(false);
  }

  function handleHomeTeamIdChange(e) {
    let updatedFixture = {
      homeTeamId: 0,
    };
    if (fixture) {
      updatedFixture = fixture;
    }
    updatedFixture.homeTeamId = e.target.value;
    setFixture(updatedFixture);
  }

  function handleAwayTeamIdChange(e) {
    let updatedFixture = {
      awayTeamId: 0,
    };
    if (fixture) {
      updatedFixture = fixture;
    }
    updatedFixture.awayTeamId = e.target.value;
    setFixture(updatedFixture);
  }

  function handleDateChange(e) {
    let updatedFixture = {
      date: "",
    };
    if (fixture) {
      updatedFixture = fixture;
    }
    updatedFixture.date = e.target.value;
    setFixture(updatedFixture);
  }

  async function updateFixture() {
    const updatedFixture = await Search.putFixture(fixture);
    const newArray = fixtures.filter((fix) => fix.id !== updatedFixture.id);
    newArray.push(updatedFixture);
    setFixtures(newArray);
    setShowEditFixture(false);
    setFixture();
  }

  async function addFixture() {
    const newFixture = await Search.postFixture(fixture);
    const newArray = fixtures;
    newArray.push(newFixture);
    setFixtures(newArray);
    setShowAddFixture(false);
    setFixture();
  }

  function deleteFixture() {
    Search.deleteFixture(fixture.id);
    const newArray = fixtures.filter((fix) => fix.id !== fixture.id);
    setFixtures(newArray);
    setShowConfirmDelete(false);
  }

  function renderTeamOptions(team) {
    return (
      <option key={team.id} value={team.id}>
        {team.name}
      </option>
    );
  }

  function renderEditFixtureModal() {
    if (fixture) {
      return (
        <>
          <Modal
            show={showEditFixture}
            onHide={handleEditFixtureCancel}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Fixture:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Row>
                  <Col>
                    <Form.Group
                      controlId="homeTeamId"
                      onChange={handleHomeTeamIdChange}
                    >
                      <Form.Label>Home Team:</Form.Label>
                      <Form.Control
                        as="select"
                        defaultValue={fixture.homeTeamId}
                      >
                        <option key="0" value={null}></option>
                        {teams.map((team) => renderTeamOptions(team))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      controlId="awayTeamId"
                      onChange={handleAwayTeamIdChange}
                    >
                      <Form.Label>Away Team:</Form.Label>
                      <Form.Control
                        as="select"
                        defaultValue={fixture.awayTeamId}
                      >
                        <option key="0" value={null}></option>
                        {teams.map((team) => renderTeamOptions(team))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="date" onChange={handleDateChange}>
                      <Form.Label>Date:</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        defaultValue={fixture.date}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditFixtureCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={updateFixture}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    return null;
  }

  function renderAddFixtureModal() {
    return (
      <>
        <Modal
          show={showAddFixture}
          onHide={handleAddFixtureCancel}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add fixture:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Group
                    controlId="homeTeamId"
                    onChange={handleHomeTeamIdChange}
                  >
                    <Form.Label>Home Team:</Form.Label>
                    <Form.Control as="select">
                      <option key="0" value={null}></option>
                      {teams.map((team) => renderTeamOptions(team))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="awayTeamId"
                    onChange={handleAwayTeamIdChange}
                  >
                    <Form.Label>Away Team:</Form.Label>
                    <Form.Control as="select">
                      <option key="0" value={null}></option>
                      {teams.map((team) => renderTeamOptions(team))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="date" onChange={handleDateChange}>
                    <Form.Label>Date:</Form.Label>
                    <Form.Control type="datetime-local"></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddFixtureCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={addFixture}>
              Add Fixture
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
            {fixture && (
              <Modal.Title>
                Delete {Helpers.getNameById(teams, fixture.homeTeamId)} v{" "}
                {Helpers.getNameById(teams, fixture.awayTeamId)}
              </Modal.Title>
            )}
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleConfirmDeleteCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteFixture}>
              Delete Fixture
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function renderTableRows(fixture) {
    return (
      <tr key={fixture.id}>
        <td>{fixture.id}</td>
        <td>{Helpers.getNameById(teams, fixture.homeTeamId)}</td>
        <td>{Helpers.getNameById(teams, fixture.awayTeamId)}</td>
        <td>
          <Moment format="DD/MM/YY">{fixture.date}</Moment> -{" "}
          <Moment format="LT">{fixture.date}</Moment>
        </td>
        <td>
          <div className="edit-button" onClick={() => handleEditClick(fixture)}>
            <img src={editIcon} alt="edit-fixture" />
          </div>
        </td>
        <td>
          <div
            className="edit-button"
            onClick={() => handleDeleteClick(fixture)}
          >
            <img src={deleteIcon} alt="delete-fixture" />
          </div>
        </td>
        <td>
          <Link to={`/admin/fixture/${fixture.id}`}>
            <div className="edit-button">
              <img src={plusIcon} alt="add-scores" />
            </div>
          </Link>
        </td>
      </tr>
    );
  }

  return (
    <>
      {renderEditFixtureModal()}
      {renderAddFixtureModal()}
      {renderConfirmDeleteModal()}
      <Header />
      <div className="add-search-container">
        <button onClick={handleAddFixtureClick}>Add Fixture</button>
      </div>
      <div className="tables-container">
        <table className="fixtures-table">
          <tr>
            <th>id</th>
            <th
              className="sort-heading"
              onClick={() => setSortBy("homeTeamId")}
            >
              Home Team
            </th>
            <th
              className="sort-heading"
              onClick={() => setSortBy("awayTeamId")}
            >
              Away Team
            </th>
            <th className="sort-heading" onClick={() => setSortBy("date")}>
              Date
            </th>
            <th>Edit Fixture</th>
            <th>Delete Fixture</th>
            <th>Add Scores</th>
          </tr>
          {fixturesList.map((fixture) => renderTableRows(fixture))}
        </table>
      </div>
    </>
  );
}
