import { useState, useEffect, useContext } from "react";
import { ManagerContext } from "../Store";
import ModalTemplate from "../ModalTemplate";
import Search from "../utils/search";

export default function ShortlistModal({ player, closeModal }) {
  const [manager, setManager] = useContext(ManagerContext);
  const [autoPick, setAutoPick] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (manager) {
      setAutoPick(manager.autoPick);
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

  if (loading) {
    return (
      <>
        <ModalTemplate
          closeModal={closeModal}
          fixed={false}
          title={`${manager.name}'s Shortlist:`}
        >
          <div className="shortlist-body-container">
            Loading...
          </div>
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
        <div className="shortlist-body-container">
          Hello this is the modal for {player.name}
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
