import React, { useEffect, useContext, useState } from "react";
import DraftFooter from "./DraftFooter";
import DraftTable from "./DraftTable";
import DraftPageHeader from "./DraftPageHeader";
import Search from "../utils/search";
import Helpers from "../utils/Helpers";
import ManagerProps from "../utils/ManagerProps";
import {
  LeagueContext,
  ManagersContext,
  PlayersContext,
  VidiprinterContext,
  ManagerContext,
} from "../Store";
import SkippedModal from "./SkippedModal";

export default function DraftPage() {
  const [players] = useContext(PlayersContext);
  const [manager] = useContext(ManagerContext);
  const [, setManagers] = useContext(ManagersContext);
  const [league, setLeague] = useContext(LeagueContext);
  const [, setVidiprinter] = useContext(VidiprinterContext);

  const [showSkipped, setShowSkipped] = useState(false);

  useEffect(() => {
    getDraftData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const dataInterval = setInterval(() => getDraftData(), 10000);
    return () => clearInterval(dataInterval);
  }, []);

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

  async function updateLeague() {
    const stage2Managers = league.stage2Managers.flat();
    const leagueCopy = JSON.parse(JSON.stringify(league));
    let maxPickNumber = 0;
    if (league.draft1Live) {
      maxPickNumber = league.managerIds.length;
    }
    if (league.draft2Live) {
      maxPickNumber = stage2Managers.length;
    }
    if (league.draft1Live || league.draft2Live) {
      if (leagueCopy.lastPick) {
        leagueCopy.round++;
        leagueCopy.up = !league.up;
        leagueCopy.lastPick = false;
      } else {
        if (leagueCopy.up) {
          if (leagueCopy.pickNumber === maxPickNumber - 1) {
            leagueCopy.lastPick = true;
            leagueCopy.pickNumber++;
          } else {
            leagueCopy.pickNumber++;
          }
        } else {
          if (leagueCopy.pickNumber === 2) {
            leagueCopy.lastPick = true;
            leagueCopy.pickNumber--;
          } else {
            leagueCopy.pickNumber--;
          }
        }
      }
    }
    if (league.draft3Live) {
      if (leagueCopy.pickNumber === 1) {
        leagueCopy.pickNumber = 2;
      } else {
        leagueCopy.pickNumber = 1;
      }
    }
    const updatedLeague = await Search.putLeague(leagueCopy);
    setLeague(updatedLeague);
  }

  const skipPick = () => {
    console.log("pick skipped");
    setShowSkipped(true);
    updateLeague();
  };

  const stage2Managers = league.stage2Managers.flat();
  const stage3Managers = league.stage3Managers.flat();

  if (!league.draft1Live && !league.draft2Live && !league.draft3Live) {
    return (
      <>
        <DraftPageHeader />
        <div className="flex-container standard-width-container">
          No drafts are currently live.
        </div>
      </>
    );
  }

  if (league.draft2Live && !stage2Managers.includes(manager.id)) {
    return (
      <>
        <DraftPageHeader />
        <div className="flex-container standard-width-container">
          You have not qualified for this draft.{" "}
        </div>
      </>
    );
  }

  if (league.draft3Live && !stage3Managers.includes(manager.id)) {
    return (
      <>
        <DraftPageHeader />
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
        <DraftPageHeader />
        <div className="flex-container standard-width-container">
          You have more than one draft stage live. Contact league admin.{" "}
        </div>
      </>
    );
  }

  return (
    <>
      {showSkipped && <SkippedModal closeModal={() => setShowSkipped(false)} />}
      <DraftPageHeader skipPick={skipPick} live/>
      <div className="standard-width-container">
        <DraftTable updateLeague={updateLeague} />
        <DraftFooter />
      </div>
    </>
  );
}
