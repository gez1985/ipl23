import React, { useContext, useState } from "react";
import { SearchNameContext, ManagerContext, LeagueContext } from "../Store";
import Loader from "react-loader-spinner";
import Search from "../utils/search";
import ModalTemplate from "../ModalTemplate";

export default function ShortlistTitle(props) {
  const [loading, setLoading] = useState(false);
  const [manager, setManager] = useContext(ManagerContext);
  const [league] = useContext(LeagueContext);
  const [searchName, setSearchName] = useContext(SearchNameContext);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleMinReqChange = async () => {
    const managerCopy = JSON.parse(JSON.stringify(manager));
    managerCopy.minReqFirst = !managerCopy.minReqFirst;
    setLoading(true);
    await Search.putManager(managerCopy);
    setManager(managerCopy);
    setLoading(false);
  };

  const handleAutoPickChange = async () => {
    const managerCopy = JSON.parse(JSON.stringify(manager));
    managerCopy.autoPick = !managerCopy.autoPick;
    setLoading(true);
    try {
      await Search.putManager(managerCopy);
    } catch (err) {
      console.log(err.message);
    }
    setManager(managerCopy);
    setLoading(false);
  };

  const handleClearClick = () => {
    setShowConfirmClear(true);
  };

  const handleClearShortlist = async () => {
    setLoading(true);
    const managerCopy = JSON.parse(JSON.stringify(manager));
    managerCopy.shortlist = [];
    try {
      await Search.putManager(managerCopy);
    } catch (err) {
      console.log(err.message);
    }
    setManager(managerCopy);
    setLoading(false);
    setShowConfirmClear(false);
  };

  const getConfirmClearModal = () => {
    return (
      <ModalTemplate
        closeModal={() => setShowConfirmClear(false)}
        title="CLEAR ALL PLAYERS"
      >
        <div className="apm-warning">
          Are you sure you wish to clear all players from your shortlist?
        </div>
        <div className="apm-button-wrapper">
          {!loading && (
            <>
              <button
                onClick={() => setShowConfirmClear(false)}
                className="apm-cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleClearShortlist}
                className="apm-pick-btn"
                style={{ backgroundColor: "red" }}
              >
                Clear all
              </button>
            </>
          )}
          {loading && <div>Loading...</div>}
        </div>
      </ModalTemplate>
    );
  };

  return (
    <>
      {showConfirmClear && getConfirmClearModal()}
      <div className="players-header">
        <div className="flex-container space-between">
          <div className="players-title-container-end disappear-small">
            <div className="slp-search-clear-wrapper">
              <input
                type="text"
                placeholder="Search by name:"
                className="player-search"
                onChange={(e) => setSearchName(e.target.value)}
                defaultValue={searchName}
              ></input>
              {!league.draft1Live && (
                <button className="slp-clear-btn" onClick={handleClearClick}>
                  Clear shortlist
                </button>
              )}
            </div>
          </div>
          <div className="players-title-container-middle disappear-small">
            <div className="page-title">{props.title}</div>
          </div>
          <div className="players-title-container-end align-items-end disappear-small">
            {!loading && !league.draft1Live && (
              <div className="sp-settings-wrapper">
                <div className="sp-checkbox-wrapper">
                  <input
                    className="sp-input-box"
                    type="checkbox"
                    checked={manager.autoPick}
                    onChange={handleAutoPickChange}
                  />
                  <label className="shortlist-checkbox-label">Auto pick?</label>
                </div>
                <div className="sp-checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={manager.autoPick ? manager.minReqFirst : false}
                    onChange={handleMinReqChange}
                    disabled={!manager.autoPick}
                  />
                  <label
                    className="shortlist-checkbox-label"
                    style={{ color: manager.autoPick ? "black" : "#ccc" }}
                  >
                    Min req first?
                  </label>
                </div>
              </div>
            )}
            {loading && (
              <Loader type="TailSpin" color="#dd6d1f" height={30} width={30} />
            )}
          </div>
        </div>
        <div className="flex-container space-between">
          <div className="disappear-big">
            <div
              className="page-title players-title"
              style={{ textAlign: "left", marginLeft: "5px" }}
            >
              {props.title}
            </div>
          </div>
          <div className="disappear-big " style={{ marginRight: "5px" }}>
            <input
              type="text"
              placeholder="Search by name:"
              className="player-search"
              onChange={(e) => setSearchName(e.target.value)}
              defaultValue={searchName}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}
