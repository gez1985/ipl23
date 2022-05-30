import React, { useContext, useEffect, useState } from "react";
import {
  LeagueContext,
  LeagueManagersContext as ManagersContext,
  ManagerContext,
} from "../Store";
import Helpers from "../utils/Helpers";
import upArrow from "../img/UpArrow.png";
import downArrow from "../img/DownArrow.png";

export default function ManagerPicking() {
  const [league] = useContext(LeagueContext);
  const [managers] = useContext(ManagersContext);
  const [manager] = useContext(ManagerContext);
  const [imgSource, setImgSource] = useState(upArrow);

  let nextPickNumber;

  if (league.draft1Live) {
    if (league.lastPick) {
      nextPickNumber = league.pickNumber;
    } else {
      if (league.up) {
        nextPickNumber = league.pickNumber + 1;
      } else {
        nextPickNumber = league.pickNumber - 1;
      }
    }
  }

  useEffect(() => {
    if (league.up) {
      setImgSource(upArrow);
    }
    if (!league.up) {
      setImgSource(downArrow);
    }
  });

  function getName() {
    const stage = league.draft1Live ? 1 : 2;
    if (league.draft1Live) {
      const managerName =
        league.pickNumber === manager.pickNumber
          ? "Your Pick"
          : Helpers.getManagerByPickNumber(stage, managers, league.pickNumber);
      return managerName;
    }
  }

  function getNextName() {
    let stage = league.draft1Live ? 1 : 2;
    if (league.draft3Live) {
      stage = 3;
    }
    const nextManager = Helpers.getManagerByPickNumber(
      stage,
      managers,
      nextPickNumber
    );
    return nextManager;
  }

  return (
    <>
      <div className="flex-container align-items-start flex-start disappear-small">
        <img
          className="draft-arrow-icon"
          src={imgSource}
          alt="the-euro-draft"
        />
        <div className="pick-info">
          {league.pickNumber} - {getName()}
        </div>
      </div>
      <div className="next-pick disappear-small">(Next: {getNextName()})</div>
      <div className="flex-container align-items-bottom disappear-big">
        <div className="pick-info">{getName()} -</div>
        <div className="next-pick">Next: {getNextName()}</div>
      </div>
    </>
  );
}
