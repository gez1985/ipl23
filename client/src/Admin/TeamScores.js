import React, { useContext, useState, useEffect } from "react";
import Helpers from "./utils/Helpers";
import Scores from "./utils/Scores";
import Search from "./utils/search";
import { TeamsContext, PlayersContext, ScoresContext } from "../Store";
import { Button, Modal, Form, Col } from "react-bootstrap";
import deleteIcon from "./images/deleteIcon.png";
import editIcon from "./images/editIcon.png";

export default function TeamScores(props) {
  const blankScore = {
    runs: 0,
    balls: 0,
    fours: 0,
    sixes: 0,
    catches: 0,
    partRunOuts: 0,
    fullRunOuts: 0,
    stumpings: 0,
    overs: 0,
    runsConceded: 0,
    wickets: 0,
    maidens: 0,
    out: true,
  };

  const [scores, setScores] = useContext(ScoresContext);
  const [teams] = useContext(TeamsContext);
  const [players] = useContext(PlayersContext);
  const [showAdd, setShowAdd] = useState(false);
  const [score, setScore] = useState(blankScore);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEdit, setShowEdit] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const matchScores = scores.filter(
    (score) => score.fixtureId === props.fixtureId
  );
  const playerIds = Helpers.getPlayerIdsFromTeamId(players, props.teamId);
  const teamScores = matchScores.filter((score) =>
    playerIds.includes(score.playerId)
  );

  function handleCancel() {
    setShowAdd(false);
    setShowConfirmDelete(false);
    setShowEdit(false);
    setScore(blankScore);
  }

  function handlePlayerChange(e) {
    let updatedScore = score;
    updatedScore.playerId = e.target.value;
    setScore(updatedScore);
  }

  function handleRunsChange(e) {
    let updatedScore = score;
    updatedScore.runs = e.target.value;
    setScore(updatedScore);
  }

  function handleBallsChange(e) {
    let updatedScore = score;
    updatedScore.balls = e.target.value;
    setScore(updatedScore);
  }

  function handleFoursChange(e) {
    let updatedScore = score;
    updatedScore.fours = e.target.value;
    setScore(updatedScore);
  }

  function handleSixesChange(e) {
    let updatedScore = score;
    updatedScore.sixes = e.target.value;
    setScore(updatedScore);
  }

  function handleCatchesChange(e) {
    let updatedScore = score;
    updatedScore.catches = e.target.value;
    setScore(updatedScore);
  }

  function handlePartRunOutsChange(e) {
    let updatedScore = score;
    updatedScore.partRunOuts = e.target.value;
    setScore(updatedScore);
  }

  function handleFullRunOutsChange(e) {
    let updatedScore = score;
    updatedScore.fullRunOuts = e.target.value;
    setScore(updatedScore);
  }

  function handleStumpingsChange(e) {
    let updatedScore = score;
    updatedScore.stumpings = e.target.value;
    setScore(updatedScore);
  }

  function handleOversChange(e) {
    let updatedScore = score;
    updatedScore.overs = e.target.value;
    setScore(updatedScore);
  }

  function handleRunsConcededChange(e) {
    let updatedScore = score;
    updatedScore.runsConceded = e.target.value;
    setScore(updatedScore);
  }

  function handleWicketsChange(e) {
    let updatedScore = score;
    updatedScore.wickets = e.target.value;
    setScore(updatedScore);
  }

  function handleMaidensChange(e) {
    let updatedScore = score;
    updatedScore.maidens = e.target.value;
    setScore(updatedScore);
  }

  function handleOutChange(e) {
    let updatedScore = score;
    updatedScore.out = !updatedScore.out;
    setScore(updatedScore);
  }

  function renderPlayerSelectOptions(player) {
    return (
      <option key={player.id} value={player.id}>
        {player.name}
      </option>
    );
  }

  async function addScore() {
    const submitScore = score;
    submitScore.fixtureId = props.fixtureId;
    const newScore = await Search.postScore(submitScore);
    const newArray = scores;
    newArray.push(newScore);
    setScores(newArray);
    setShowAdd(false);
    setScore(blankScore);
  }

  async function updateScore() {
    const updatedScore = await Search.putScore(score);
    const newArray = scores.filter((sco) => sco.id !== updatedScore.id);
    newArray.push(updatedScore);
    setScores(newArray);
    setShowEdit(false);
    setScore(blankScore);
  }

  async function deleteScore() {
    await Search.deleteScore(score.id);
    const newArray = scores.filter((sco) => sco.id !== score.id);
    setScores(newArray);
    setShowConfirmDelete(false);
  }

  function handleDeleteClick(score) {
    const uneditedScore = JSON.parse(JSON.stringify(score));
    setScore(uneditedScore);
    setShowConfirmDelete(true);
  }

  function handleEditClick(score) {
    const uneditedScore = JSON.parse(JSON.stringify(score));
    setScore(uneditedScore);
    setShowEdit(true);
  }

  function renderAddScoreModal() {
    const teamPlayers = players.filter(
      (player) => player.teamId === props.teamId
    );
    return (
      <>
        <Modal
          show={showAdd}
          onHide={handleCancel}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Score</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Group controlId="name" onChange={handlePlayerChange}>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control as="select">
                      <option key="0" value={null}></option>
                      {teamPlayers.map((player) =>
                        renderPlayerSelectOptions(player)
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="runs" onChange={handleRunsChange}>
                    <Form.Label>Runs:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.runs}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="balls" onChange={handleBallsChange}>
                    <Form.Label>Balls:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.balls}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="fours" onChange={handleFoursChange}>
                    <Form.Label>Fours:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.fours}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="sixes" onChange={handleSixesChange}>
                    <Form.Label>Sixes:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.sixes}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group
                    controlId="catches"
                    onChange={handleCatchesChange}
                  >
                    <Form.Label>Catches:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.catches}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="part-run-outs"
                    onChange={handlePartRunOutsChange}
                  >
                    <Form.Label>Part Run Outs:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.partRunOuts}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="full-run-outs"
                    onChange={handleFullRunOutsChange}
                  >
                    <Form.Label>Full Run Outs:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.fullRunOuts}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="stumpings"
                    onChange={handleStumpingsChange}
                  >
                    <Form.Label>Stumpings:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.stumpings}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row></Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="overs" onChange={handleOversChange}>
                    <Form.Label>Overs:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.overs}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="runs-conceded"
                    onChange={handleRunsConcededChange}
                  >
                    <Form.Label>Runs Conceded:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.runsConceded}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="wickets"
                    onChange={handleWicketsChange}
                  >
                    <Form.Label>Wickets:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.wickets}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="maidens"
                    onChange={handleMaidensChange}
                  >
                    <Form.Label>Maidens:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.maidens}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="out" onChange={handleOutChange}>
                    <Form.Label>Out:</Form.Label>
                    <Form.Control
                      type="checkbox"
                      defaultChecked={score.out}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={addScore}>
              Add Score
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function renderEditScoreModal() {
    const teamPlayers = players.filter(
      (player) => player.teamId === props.teamId
    );
    return (
      <>
        <Modal
          show={showEdit}
          onHide={handleCancel}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Edit Score ({Helpers.getNameById(players, score.playerId)}):
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Group controlId="name" onChange={handlePlayerChange}>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control as="select" defaultValue={score.playerId}>
                      <option key="0" value={null}></option>
                      {teamPlayers.map((player) =>
                        renderPlayerSelectOptions(player)
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="runs" onChange={handleRunsChange}>
                    <Form.Label>Runs:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.runs}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="balls" onChange={handleBallsChange}>
                    <Form.Label>Balls:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.balls}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="fours" onChange={handleFoursChange}>
                    <Form.Label>Fours:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.fours}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="sixes" onChange={handleSixesChange}>
                    <Form.Label>Sixes:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.sixes}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group
                    controlId="catches"
                    onChange={handleCatchesChange}
                  >
                    <Form.Label>Catches:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.catches}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="part-run-outs"
                    onChange={handlePartRunOutsChange}
                  >
                    <Form.Label>Part Run Outs:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.partRunOuts}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="full-run-outs"
                    onChange={handleFullRunOutsChange}
                  >
                    <Form.Label>Full Run Outs:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.fullRunOuts}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="stumpings"
                    onChange={handleStumpingsChange}
                  >
                    <Form.Label>Stumpings:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.stumpings}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col>
                  <Form.Group controlId="overs" onChange={handleOversChange}>
                    <Form.Label>Overs:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.overs}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="runs-conceded"
                    onChange={handleRunsConcededChange}
                  >
                    <Form.Label>Runs Conceded:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.runsConceded}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="wickets"
                    onChange={handleWicketsChange}
                  >
                    <Form.Label>Wickets:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.wickets}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="maidens"
                    onChange={handleMaidensChange}
                  >
                    <Form.Label>Maidens:</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={score.maidens}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="out" onChange={handleOutChange}>
                    <Form.Label>Out:</Form.Label>
                    <Form.Control
                      type="checkbox"
                      defaultChecked={score.out}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={updateScore}>
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
            <Modal.Title>
              Delete Score ({Helpers.getNameById(players, score.playerId)}):
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteScore}>
              Delete Score
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function renderTableRows(score) {
    const player = Helpers.getObjectById(players, score.playerId);
    return (
      <tr key={score.id}>
        <td>{Helpers.getNameById(players, score.playerId)}</td>
        <td>{score.runs}</td>
        <td>{score.balls}</td>
        <td>{score.fours}</td>
        <td>{score.sixes}</td>
        <td>{score.catches}</td>
        <td>{score.partRunOuts}</td>
        <td>{score.fullRunOuts}</td>
        <td>{score.stumpings}</td>
        <td>{score.overs}</td>
        <td>{score.runsConceded}</td>
        <td>{score.wickets}</td>
        <td>{score.maidens}</td>
        <td>{Scores.getScorePoints(player, score)}</td>
        <td>
          <div className="edit-button">
            <img
              src={editIcon}
              alt="edit-score"
              onClick={() => handleEditClick(score)}
            />
          </div>
        </td>
        <td>
          <div className="edit-button" onClick={() => handleDeleteClick(score)}>
            <img src={deleteIcon} alt="delete-score" />
          </div>
        </td>
      </tr>
    );
  }

  return (
    <>
      {renderAddScoreModal()}
      {renderConfirmDeleteModal()}
      {renderEditScoreModal()}
      <div className="add-search-container">
        <div className="team-scores-label">
          {Helpers.getNameById(teams, props.teamId)}
        </div>
        <button onClick={() => setShowAdd(!showAdd)}>Add Score</button>
      </div>
      <div className="tables-container">
        <table className="team-scores-table">
          <tr>
            <th>Name</th>
            <th>Runs</th>
            <th>Balls</th>
            <th>Fours</th>
            <th>Sixes</th>
            <th>Catches</th>
            <th>Part Run Outs</th>
            <th>Full Run Outs</th>
            <th>Stumpings</th>
            <th>Overs</th>
            <th>Runs Conceded</th>
            <th>Wickets</th>
            <th>Maidens</th>
            <th>Total Points</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {teamScores.map((score) => renderTableRows(score))}
        </table>
      </div>
    </>
  );
}
