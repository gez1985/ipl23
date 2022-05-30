import React, { useEffect, useContext, useState, useRef } from "react";
import DraftFooter from "./DraftFooter";
import DraftTable from "./DraftTable";
import DraftPageHeader from "./DraftPageHeader";
import Search from "../utils/search";
import Helpers from "../utils/Helpers";
import ManagerProps from "../utils/ManagerProps";
import {
  LeagueContext,
  LeagueManagersContext as ManagersContext,
  PlayersContext,
  VidiprinterContext,
  ManagerContext,
} from "../Store";
import SkippedModal from "./SkippedModal";
import autoPick from "./AutoPick";

export default function DraftPage() {

  const [players] = useContext(PlayersContext);
  const [manager, setManager] = useContext(ManagerContext);
  const [managers, setManagers] = useContext(ManagersContext);
  const [league, setLeague] = useContext(LeagueContext);
  const [, setVidiprinter] = useContext(VidiprinterContext);

  const [showSkipped, setShowSkipped] = useState(false);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const previousPickNumber = usePrevious(league.pickNumber);
  const previousRound = usePrevious(league.round);

  useEffect(() => {
    getDraftData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const dataInterval = setInterval(() => getDraftData(), 10000);
    return () => clearInterval(dataInterval);
  }, []);

  useEffect(() => {
    const checkManager = Helpers.getObjectById(managers, manager.id);
    if (checkManager.stage1Squad.length > manager.stage1Squad.length) {
      console.log('manager data conflict');
      setManager(checkManager);
    }
  }, [managers]);

  useEffect(() => {
    if (manager.id === league.adminManagerId) {
      if (
        previousPickNumber !== league.pickNumber ||
        previousRound !== league.round
      ) {
        console.log("Auto pick checking...");
        const pickingManager = managers.find(
          (manager) => manager.pickNumber === league.pickNumber
        );
        if (pickingManager.autoPick) {
          autoPick(league, pickingManager, managers, players);
        } else {
          console.log("auto pick NOT required");
        }
      }
    }
  }, [league]);

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
    const leagueCopy = JSON.parse(JSON.stringify(league));
    let maxPickNumber = 0;
    if (league.draft1Live) {
      maxPickNumber = league.managerIds.length;
    }
    if (league.draft1Live) {
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

  const skipPick = async () => {
    setShowSkipped(true);
    updateLeague();
  };

  async function updateVidiprinter(leagueId, managerId, playerId) {
    const vidiEntry = {
      leagueId: leagueId,
      managerId: managerId,
      playerId: playerId,
    };
    try {
      await Search.postVidiprinter(vidiEntry);
    } catch (err) {
      console.log(err.message);
    }
  }

  if (!league.draft1Live) {
    return (
      <>
        <DraftPageHeader live={false} />
        <div className="flex-container standard-width-container">
          The draft is not currently live.
        </div>
      </>
    );
  }

  if (manager.autoPick && manager.id !== league.adminManagerId) {
    return (
      <>
        <DraftPageHeader live={false} />
        <div className="flex-container standard-width-container">
          You are auto picking your players.
        </div>
      </>
    );
  }

  return (
    <>
      {showSkipped && <SkippedModal closeModal={() => setShowSkipped(false)} />}
      <DraftPageHeader skipPick={skipPick} live={true} />
      <div className="standard-width-container">
        <DraftTable
          updateLeague={updateLeague}
          updateVidiprinter={updateVidiprinter}
        />
        <DraftFooter />
      </div>
    </>
  );
}
