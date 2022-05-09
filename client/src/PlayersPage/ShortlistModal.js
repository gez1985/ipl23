import { useState, useEffect, useContext } from "react";
import { ManagerContext, PlayersContext, TeamsContext } from "../Store";
import ModalTemplate from "../ModalTemplate";
import Search from "../utils/search";
import Helpers from "../utils/Helpers";
import { IoPersonRemove } from "react-icons/io5";
import { IconContext } from "react-icons";

export default function ShortlistModal({ player, closeModal }) {
  const [manager, setManager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  const [teams] = useContext(TeamsContext);
  const [autoPick, setAutoPick] = useState();
  const [loading, setLoading] = useState(false);
  const [entryNumber, setEntryNumber] = useState(1);
  const [error, setError] = useState();

  useEffect(() => {
    if (manager) {
      setAutoPick(manager.autoPick);
    }
    if (manager.shortlist.includes(player.id)) {
      setError(
        "Player already on your shortlist, remove the player first if you wish to move them"
      );
    }
  }, []);

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const managerCopy = JSON.parse(JSON.stringify(manager));
      managerCopy.autoPick = autoPick;
      await Search.putManager(managerCopy);
      setManager(managerCopy);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  const handleAddPlayerClick = async () => {
    if (!entryNumber) {
      setError("Please select a position number");
    } else if (manager.shortlist.includes(player.id)) {
      setError(
        "Player already on your shortlist, remove the player first if you wish to move them"
      );
    } else {
      setLoading(true);
      try {
        const managerCopy = JSON.parse(JSON.stringify(manager));
        if (entryNumber > manager.shortlist.length) {
          managerCopy.shortlist.push(player.id);
        } else if (entryNumber === 1) {
          managerCopy.shortlist.unshift(player.id);
        } else {
          managerCopy.shortlist.splice(entryNumber - 1, 0, player.id);
        }
        await Search.putManager(managerCopy);
        setManager(managerCopy);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    }
  };

  const handleRemovePlayerClick = async (itemIndex) => {
    console.log(`player removed from array with index ${itemIndex}`);
    if (itemIndex > -1) {
      try {
        setLoading(true);
        const managerCopy = JSON.parse(JSON.stringify(manager));
        managerCopy.shortlist.splice(itemIndex, 1);
        await Search.putManager(managerCopy);
        setManager(managerCopy);
        setError();
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    }
  };

  const handleEntryNumberChange = (e) => {
    setEntryNumber(Math.floor(e.target.value));
    setError();
  };

  const PlayerList = () => {
    const renderTableRows = (playerId, itemIndex) => {
      const player = Helpers.getObjectById(players, playerId);
      return (
        <div key={playerId} className="shortlist-table-row-container">
          <div className="shortlist-table-detail">{itemIndex + 1}</div>
          <div className="shortlist-table-detail">{player.name}</div>
          <div className="shortlist-table-detail">
            {Helpers.getNameById(teams, player.teamId)}
          </div>
          <div className="shortlist-table-detail">{player.role}</div>
          <div className="shortlist-table-detail">
            <IconContext.Provider
              value={{ size: "1.3rem", color: "#666", cursor: "pointer" }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleRemovePlayerClick(itemIndex)}
              >
                <IoPersonRemove />
              </div>
            </IconContext.Provider>
          </div>
        </div>
      );
    };

    return (
      <div className="shortlist-player-list-container">
        <div className="shortlist-table-headers-container">
          <div className="shortlist-table-detail">Position</div>
          <div className="shortlist-table-detail">Name</div>
          <div className="shortlist-table-detail">Team</div>
          <div className="shortlist-table-detail">Role</div>
          <div className="shortlist-table-detail">Delete</div>
        </div>
        <div className="shortlist-render-players-container">
          {manager.shortlist.map((playerId, itemIndex) =>
            renderTableRows(playerId, itemIndex)
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <ModalTemplate
          closeModal={closeModal}
          fixed={false}
          title={`${manager.name}'s Shortlist:`}
        >
          <div className="shortlist-body-container">Loading...</div>
        </ModalTemplate>
      </>
    );
  }

  return (
    <>
      <ModalTemplate
        closeModal={closeModal}
        fixed={false}
        title={`${manager.name}'s Shortlist:`}
      >
        {error && <div className="shortlist-error">{error}</div>}
        <div className="shortlist-add-player-container">
          <div className="shortlist-add-player-caption">
            Add {player.name} in position
          </div>
          <input
            className="shortlist-number-input"
            type="number"
            min={1}
            defaultValue={1}
            onChange={handleEntryNumberChange}
          />
          <button
            className={
              error
                ? "shortlist-add-player-button-disabled"
                : "shortlist-add-player-button"
            }
            onClick={handleAddPlayerClick}
            disabled={error ? true : false}
          >
            + Add Player
          </button>
        </div>
        <PlayerList />
        <div className="shortlist-modal-footer-container">
          <div>
            <input
              type="checkbox"
              id="autoPick"
              checked={autoPick}
              onChange={(e) => setAutoPick(e.target.checked)}
              className="shortlist-auto-pick-checkbox"
            />
            <label htmlFor="autoPick" className="shortlist-auto-pick-label">
              Auto pick
            </label>
          </div>
          <div>
            <button
              className="shortlist-save-auto-pick-button"
              onClick={handleSaveClick}
            >
              Save auto pick
            </button>
            <button className="shortlist-close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </ModalTemplate>
    </>
  );
}
