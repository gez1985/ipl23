import React, { useEffect, useContext, useState } from "react";
import ComponentHeader from "./ComponentHeader";
import DraftFooter from "./DraftFooter";
import DraftTable from "./DraftTable";
import Search from "./utils/search";
import Helpers from "./utils/Helpers";
import ManagerProps from "./utils/ManagerProps";
import {
  LeagueContext,
  ManagersContext,
  PlayersContext,
  VidiprinterContext,
  ManagerContext,
} from "./Store";

export default function DraftPage() {
  const [players] = useContext(PlayersContext);
  const [manager] = useContext(ManagerContext);
  const [, setManagers] = useContext(ManagersContext);
  const [league, setLeague] = useContext(LeagueContext);
  const [, setVidiprinter] = useContext(VidiprinterContext);

  let dataInterval;

  useEffect(() => {
    getDraftData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    startUpdateIntervals();
    return function cleanUp() {
      clearUpdateIntervals();
    };
  }, []);

  function startUpdateIntervals() {
    dataInterval = setInterval(() => getDraftData(), 10000);
  }

  function clearUpdateIntervals() {
    clearInterval(dataInterval);
  }

  async function getDraftData() {
    try {
      const managersData = await Search.getAllManagers();
      const leagueData = await Search.getLeagueById(league.id);
      const vidiprinterData = await Search.getVidiprinterById(league.id);
      vidiprinterData.reverse();
      ManagerProps.getManagerProperties(managersData, players);
      setManagers(Helpers.setManagersByLeague(league, managersData));
      setLeague(leagueData[0]);
      setVidiprinter(vidiprinterData);
      console.log(`Got Data`);
    } catch (err) {
      console.error(err.message);
    }
  }

  const stage2Managers = league.stage2Managers.flat();
  const stage3Managers = league.stage3Managers.flat();

  if (!league.draft1Live && !league.draft2Live && !league.draft3Live) {
    return (
      <>
        <ComponentHeader from="draft" title="The Draft" />
        <div className="flex-container standard-width-container">
          No drafts are currently live.
        </div>
      </>
    );
  }

  if (league.draft2Live && !stage2Managers.includes(manager.id)) {
    return (
      <>
        <ComponentHeader from="draft" title="The Draft" />
        <div className="flex-container standard-width-container">
          You have not qualified for this draft.{" "}
        </div>
      </>
    );
  }

  if (league.draft3Live && !stage3Managers.includes(manager.id)) {
    return (
      <>
        <ComponentHeader from="draft" title="The Draft" />
        <div className="flex-container standard-width-container">
          You have not qualified for this draft.{" "}
        </div>
      </>
    );
  }

  if (
    (league.draft1Live && league.draft2Live) ||
    (league.draft1Live && league.draft3Live) ||
    (league.draft2Live && league.draft3Live) ||
    (league.draft1Live && league.draft2Live && league.draft3Live)
  ) {
    return (
      <>
        <ComponentHeader from="draft" title="The Draft" />
        <div className="flex-container standard-width-container">
          You have more than one draft stage live. Contact league admin.{" "}
        </div>
      </>
    );
  }

  return (
    <>
      <ComponentHeader from="draft" title="The Draft" />
      <div className="standard-width-container">
        <DraftTable />
        <DraftFooter />
      </div>
    </>
  );
}
