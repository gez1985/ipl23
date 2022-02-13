import React, { useContext, useState, useEffect, useRef } from "react";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import { LeagueContext, ManagersContext } from "../Store";
import Search from "./utils/search";
import viewEye from "./images/viewEye.png";
import StageManagers from "./StageManagers";
import StageTeams from "./StageTeams";
import LeagueManagers from "./LeagueManagers";
import RandomisePicksModal from './RandomisePicksModal';

export default function League() {
  const [league, setLeague] = useContext(LeagueContext);
  const [managers] = useContext(ManagersContext);
  const [editedLeague, setEditedLeague] = useState();
  const [edit, setEdit] = useState(false);
  const [showStage2Managers, setShowStage2Managers] = useState(false);
  const [showStage2Teams, setShowStage2Teams] = useState(false);
  const [showStage3Managers, setShowStage3Managers] = useState(false);
  const [showStage3Teams, setShowStage3Teams] = useState(false);
  const [showStage4Managers, setShowStage4Managers] = useState(false);
  const [showStage4Teams, setShowStage4Teams] = useState(false);
  const [showAllManagers, setShowAllManagers] = useState(false);
  const [showRandomise, setShowRandomise] = useState(false);

  const previousLeague = usePrevious(league);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!previousLeague && league) {
      const mutableLeague = JSON.parse(JSON.stringify(league));
      setEditedLeague(mutableLeague);
    }
  });

  if (!league || !managers || !editedLeague) {
    return (
      <>
        <LoadingSpinner loading={true} />
      </>
    );
  }

  function resetModals() {
    setShowStage2Managers(false);
    setShowStage2Teams(false);
    setShowStage3Managers(false);
    setShowStage3Teams(false);
    setShowStage4Managers(false);
    setShowStage4Teams(false);
    setShowAllManagers(false);
    setShowRandomise(false);
  }

  function handleDraft1LiveChange() {
    let updatedLeague = editedLeague;
    updatedLeague.draft1Live = !updatedLeague.draft1Live;
    setEditedLeague(updatedLeague);
  }

  function handleDraft2LiveChange() {
    let updatedLeague = editedLeague;
    updatedLeague.draft2Live = !updatedLeague.draft2Live;
    setEditedLeague(updatedLeague);
  }

  function handleDraft3LiveChange() {
    let updatedLeague = editedLeague;
    updatedLeague.draft3Live = !updatedLeague.draft3Live;
    setEditedLeague(updatedLeague);
  }

  function handleRoundChange(e) {
    let updatedLeague = editedLeague;
    updatedLeague.round = e.target.value;
    setEditedLeague(updatedLeague);
  }

  function handlePickNumberChange(e) {
    let updatedLeague = editedLeague;
    updatedLeague.pickNumber = e.target.value;
    setEditedLeague(updatedLeague);
  }

  function handleUpChange() {
    let updatedLeague = editedLeague;
    updatedLeague.up = !updatedLeague.up;
    setEditedLeague(updatedLeague);
  }

  function handleLastPickChange() {
    let updatedLeague = editedLeague;
    updatedLeague.lastPick = !updatedLeague.lastPick;
    setEditedLeague(updatedLeague);
  }

  function handleStage2DateChange(e) {
    let updatedLeague = editedLeague;
    updatedLeague.stage2Date = e.target.value;
    setEditedLeague(updatedLeague);
  }

  function handleStage3DateChange(e) {
    let updatedLeague = editedLeague;
    updatedLeague.stage3Date = e.target.value;
    setEditedLeague(updatedLeague);
  }

  function handleStage4DateChange(e) {
    let updatedLeague = editedLeague;
    updatedLeague.stage4Date = e.target.value;
    setEditedLeague(updatedLeague);
  }

  async function updateLeague() {
    const updatedLeague = await Search.putLeague(editedLeague);
    alert("changes saved");
    setLeague(updatedLeague);
  }

  return (
    <>
      <Header />
      <h4>League Manager Admin:</h4>
      <div className="add-search-container">
        <button onClick={() => setShowRandomise(true)}>
          Randomise Picks
        </button>
      </div>
      <div className="tables-container">
        <table>
          <tr>
            <th>Managers</th>
          </tr>
          <tr>
            <td
              className="sort-heading"
              onClick={() => setShowAllManagers(true)}
            >
              <img src={viewEye} alt="view-squad" />
            </td>
          </tr>
        </table>
        <table className="league-stages">
          <tr>
            <th>Stage 2 Managers</th>
            <th>Stage 2 Teams</th>
            <th>Stage 3 Managers</th>
            <th>Stage 3 Teams</th>
            <th>Stage 4 Managers</th>
            <th>Stage 4 Teams</th>
          </tr>
          <tr>
            <td
              className="sort-heading"
              onClick={() => setShowStage2Managers(true)}
            >
              <img src={viewEye} alt="view-squad" />
            </td>
            <td
              className="sort-heading"
              onClick={() => setShowStage2Teams(true)}
            >
              <img src={viewEye} alt="view-squad" />
            </td>
            <td
              className="sort-heading"
              onClick={() => setShowStage3Managers(true)}
            >
              <img src={viewEye} alt="view-squad" />
            </td>
            <td
              className="sort-heading"
              onClick={() => setShowStage3Teams(true)}
            >
              <img src={viewEye} alt="view-squad" />
            </td>
            <td
              className="sort-heading"
              onClick={() => setShowStage4Managers(true)}
            >
              <img src={viewEye} alt="view-squad" />
            </td>
            <td
              className="sort-heading"
              onClick={() => setShowStage4Teams(true)}
            >
              <img src={viewEye} alt="view-squad" />
            </td>
          </tr>
        </table>
      </div>
      <h4>League Settings Admin:</h4>
      <div className="add-search-container">
        <button onClick={() => setEdit(!edit)}>
          Edit Settings {edit ? "ON" : "OFF"}
        </button>
      </div>
      <div className="tables-container">
        <table>
          <tr>
            <th>Draft 1 Live</th>
            <th>Draft 2 Live</th>
            <th>Draft 3 Live</th>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                id="draft1Live"
                name="draft1Live"
                defaultChecked={editedLeague.draft1Live}
                onChange={handleDraft1LiveChange}
                disabled={!edit}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="draft2Live"
                name="draft2Live"
                defaultChecked={editedLeague.draft2Live}
                onChange={handleDraft2LiveChange}
                disabled={!edit}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="draft3Live"
                name="draft3Live"
                defaultChecked={editedLeague.draft3Live}
                onChange={handleDraft3LiveChange}
                disabled={!edit}
              />
            </td>
          </tr>
        </table>
        <table>
        </table>
        <table>
          <tr>
            <th>Round</th>
            <th>Pick Number</th>
            <th>Up?</th>
            <th>Last Pick?</th>
          </tr>
          <tr>
            <td>
              <input
                className="shrinking-input"
                type="number"
                id="round"
                name="round"
                defaultValue={editedLeague.round}
                onChange={handleRoundChange}
                readOnly={!edit}
              />
            </td>
            <td>
              <input
              className="shrinking-input"
                type="number"
                id="pickNumber"
                name="pickNumber"
                defaultValue={editedLeague.pickNumber}
                onChange={handlePickNumberChange}
                readOnly={!edit}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="up"
                name="up"
                defaultChecked={editedLeague.up}
                onChange={handleUpChange}
                disabled={!edit}
              />
            </td>
            <td>
              <input
                type="checkbox"
                id="lastPick"
                name="lastPick"
                defaultChecked={editedLeague.lastPick}
                onChange={handleLastPickChange}
                disabled={!edit}
              />
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <th>End of Stage 1</th>
            <th>End of Stage 2</th>
            <th>End of Stage 3</th>
          </tr>
          <tr>
            <td>
              <input
                className="shrinking-input"
                type="datetime-local"
                id="stage1"
                name="stage1"
                defaultValue={editedLeague.stage2Date}
                onChange={handleStage2DateChange}
                readOnly={!edit}
              />
            </td>
            <td>
              <input
                className="shrinking-input"
                type="datetime-local"
                id="stage2"
                name="stage2"
                defaultValue={editedLeague.stage3Date}
                onChange={handleStage3DateChange}
                readOnly={!edit}
              />
            </td>
            <td>
              <input
                className="shrinking-input"
                type="datetime-local"
                id="stage3"
                name="stage3"
                defaultValue={editedLeague.stage4Date}
                onChange={handleStage4DateChange}
                readOnly={!edit}
              />
            </td>
          </tr>
        </table>

        <div className="bottom-button-container">
          <button onClick={updateLeague}>Save Settings</button>
        </div>
        {showStage2Managers && (
          <StageManagers hide={resetModals} from="Stage 2 Managers" />
        )}
        {showStage2Teams && (
          <StageTeams hide={resetModals} from="Stage 2 Teams" />
        )}
        {showStage3Managers && (
          <StageManagers hide={resetModals} from="Stage 3 Managers" />
        )}
        {showStage3Teams && (
          <StageTeams hide={resetModals} from="Stage 3 Teams" />
        )}
        {showStage4Managers && (
          <StageManagers hide={resetModals} from="Stage 4 Managers" />
        )}
        {showStage4Teams && (
          <StageTeams hide={resetModals} from="Stage 4 Teams" />
        )}
        {showAllManagers && (
          <LeagueManagers hide={resetModals} from="All Managers" />
        )}
        {showRandomise && (
          <RandomisePicksModal hide={resetModals} from="All Managers" />
        )}
      </div>
    </>
  );
}
