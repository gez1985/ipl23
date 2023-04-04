import React, { useContext, useState } from "react";
import { SearchNameContext, ManagerContext } from "../Store";
import Loader from "react-loader-spinner";
import Search from "../utils/search";
import ModalTemplate from "../ModalTemplate";

export default function TransfersTitle(props) {
  const [loading, setLoading] = useState(false);
  const [manager, setManager] = useContext(ManagerContext);
  const [searchName, setSearchName] = useContext(SearchNameContext);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleClearClick = () => {
    setShowConfirmClear(true);
  };

  const handleClearTransfers = async () => {
    setLoading(true);
    const managerCopy = JSON.parse(JSON.stringify(manager));
    managerCopy.transfers = [];
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
          Are you sure you wish to clear all players from your transfer list?
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
                onClick={handleClearTransfers}
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
            </div>
          </div>
          <div className="players-title-container-middle disappear-small">
            <div className="page-title">{props.title}</div>
          </div>
          <div className="players-title-container-end align-items-end disappear-small">
            <div className="sp-settings-wrapper">
              <button className="slp-clear-btn" onClick={handleClearClick}>
                Clear transfer list
              </button>
            </div>

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
