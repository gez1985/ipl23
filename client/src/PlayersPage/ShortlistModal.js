import { useState, useEffect, useContext } from "react";
import { ManagerContext } from "../Store";
import ModalTemplate from "../ModalTemplate";
import Search from "../utils/search";

export default function ShortlistModal({ player, closeModal }) {
  const [manager, setManager] = useContext(ManagerContext);
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

  console.log(manager);

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
      closeModal();
    }
  };

  const handleEntryNumberChange = (e) => {
    setEntryNumber(Math.floor(e.target.value));
    setError();
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
        {error && <div>{error}</div>}
        <div className="shortlist-add-player-container">
          <div>Add {player.name} in position</div>
          <input
            type="number"
            min={1}
            defaultValue={1}
            onChange={handleEntryNumberChange}
          />
          <button
            onClick={handleAddPlayerClick}
            disabled={error ? true : false}
          >
            Save {player.name}
          </button>
        </div>
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
