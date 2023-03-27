import React, { useState, useEffect, useContext } from "react";
import { ManagerContext, PlayersContext } from "../Store";
import Search from "../utils/search";
import Helpers from "../utils/Helpers";
import AutoSortItemDisplay from "./AutoSortItemDisplay";
import clsx from "clsx";
import Loader from "react-loader-spinner";

const AutoSortComponent = ({ playerId, close }) => {
  const [manager, setManager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(manager.shortlist.length - 1);
  const [compareIndex, setCompareIndex] = useState(
    Math.floor((startIndex + endIndex) / 2)
  );
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [displayIndex, setDisplayIndex] = useState();

  useEffect(() => {
    setCompareIndex(Math.floor((startIndex + endIndex) / 2));
  });

  const sortPlayer = Helpers.getObjectById(players, playerId);
  const comparePlayer = Helpers.getObjectById(
    players,
    manager.shortlist[compareIndex]
  );

  const confirmAddPlayer = async () => {
    const managerCopy = JSON.parse(JSON.stringify(manager));
    managerCopy.shortlist.splice(displayIndex, 0, playerId);
    try {
      setLoading(true);
      await Search.putManager(managerCopy);
      setManager(managerCopy);
      setLoading(false);
      close();
    } catch (error) {
      console.log(error.message);
    }
  };

  const chooseSorted = async () => {
    if (endIndex === compareIndex) {
      setConfirm(true);
      setDisplayIndex(compareIndex + 1);
    }
    setStartIndex(compareIndex + 1);
  };

  const chooseUnsorted = async () => {
    if (startIndex === compareIndex) {
      setConfirm(true);
      setDisplayIndex(compareIndex);
    }
    setEndIndex(compareIndex - 1);
  };

  const ConfirmPlayerDisplay = ({ index, sortPlayer = false }) => {
    const managerCopy = JSON.parse(JSON.stringify(manager));
    managerCopy.shortlist.splice(displayIndex, 0, playerId);
    const player = Helpers.getObjectById(players, managerCopy.shortlist[index]);
    if (index > -1 && player) {
      return (
        <div
          className={clsx(
            "shortlist-page-confirm-player-display",
            sortPlayer ? "shortlist-page-confirm-player-sort-player" : ""
          )}
        >
          <div className="shortlist-page-confirm-player-position">
            {index + 1}
          </div>
          <span className="shortlist-page-confirm-player-name">
            {" "}
            {player.name}
          </span>
        </div>
      );
    }
    return null;
  };

  if (confirm) {
    return (
      <div>
        <div className="shortlist-page-auto-modal-confirm-names">
          <ConfirmPlayerDisplay index={displayIndex - 2} />
          <ConfirmPlayerDisplay index={displayIndex - 1} />
          <ConfirmPlayerDisplay index={displayIndex} sortPlayer={true} />
          <ConfirmPlayerDisplay index={displayIndex + 1} />
          <ConfirmPlayerDisplay index={displayIndex + 2} />
        </div>
        <div className="shortlist-page-auto-modal-confirm-caption">
          Add {sortPlayer.name} in position {displayIndex + 1}?
        </div>
        {loading ? (
          <Loader type="TailSpin" color="#dd6d1f" height={30} width={30} />
        ) : (
          <>
            <button
              className="slp-auto-modal-btn slp-green"
              onClick={confirmAddPlayer}
            >
              confirm
            </button>
            <button className="slp-auto-modal-btn" onClick={close}>
              cancel
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="shortlist-page-auto-sort-names-wrapper">
      <p className="shortlist-page-auto-modal-select-caption">
        Select your preferred player:
      </p>
      <AutoSortItemDisplay player={sortPlayer} chooseClick={chooseUnsorted} />
      <AutoSortItemDisplay player={comparePlayer} chooseClick={chooseSorted} />
    </div>
  );
};

export default AutoSortComponent;
