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
import ShortlistPickModal from "./ShortlistPickModal";
import { Button, Modal } from "react-bootstrap";
import PickValidation from "../utils/PickValidation";
import DraftValidation from "./DraftValidation";
import AutoPickModal from "./AutoPickModal";

export default function DraftPage() {
  const [players] = useContext(PlayersContext);
  const [manager, setManager] = useContext(ManagerContext);
  const [managers, setManagers] = useContext(ManagersContext);
  const [league, setLeague] = useContext(LeagueContext);
  const [, setVidiprinter] = useContext(VidiprinterContext);

  const [showSkipped, setShowSkipped] = useState(false);
  const [showShortlistPick, setShowShortlistPick] = useState(false);
  const [showConfirmPick, setShowConfirmPick] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [showError, setShowError] = useState(false);
  const [showAutoPick, setShowAutoPick] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

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
      console.log("manager data conflict");
      alert("make sure you only have one draft page tab open");
      setManager(checkManager);
    }
  }, [managers]);

  useEffect(() => {
    if (manager.id === league.adminManagerId) {
      const pickingManager = managers.find(
        (manager) => manager.pickNumber === league.pickNumber
      );
      if (pickingManager.stage1Squad.length >= 13) {
        console.log(`manager ${pickingManager.name} has a full squad`);
        updateLeague();
      }
    }
  }, [league]);

  // useEffect(() => {
  //   if (manager.id === league.adminManagerId) {
  //     if (
  //       previousPickNumber !== league.pickNumber ||
  //       previousRound !== league.round
  //     ) {
  //       console.log("Auto pick checking...");
  //       const pickingManager = managers.find(
  //         (manager) => manager.pickNumber === league.pickNumber
  //       );
  //       if (pickingManager.autoPick) {
  //         autoPick(league, pickingManager, managers, players);
  //       } else {
  //         console.log("auto pick NOT required");
  //       }
  //     }
  //   }
  // }, [league]);

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

  function handleCancel() {
    setShowError(false);
    setShowConfirmPick(false);
    setSelectedPlayer();
  }

  function handleSelectPlayer(player) {
    const validPickMessage = pickValidation(player);
    setErrorMessage(validPickMessage);
    setSelectedPlayer(player);
    setShowShortlistPick(false);
    if (validPickMessage === "pass") {
      setShowConfirmPick(true);
    } else {
      setShowError(true);
    }
  }

  async function selectPlayer() {
    const validPick = PickValidation(league, manager, selectedPlayer);
    if (!validPick) {
      handleCancel();
      alert("an error occurred");
      return;
    }
    const managerCopy = JSON.parse(JSON.stringify(manager));
    if (league.draft1Live) {
      managerCopy.stage1Squad.push(selectedPlayer.id);
    } else {
      console.log(`error no draft live found`);
    }
    setManager(managerCopy);
    const newManagers = managers.filter((man) => man.id !== manager.id);
    newManagers.push(managerCopy);
    setManagers(newManagers);
    try {
      await Search.putManager(managerCopy);
    } catch (err) {
      console.log(err);
    }
    handleCancel();
    updateLeague();
    updateVidiprinter(league.id, manager.id, selectedPlayer.id);
    if (league.lastPick) {
      console.log("timer needs resetting");
      setResetTimer(!resetTimer);
    }
  }

  function pickValidation(player) {
    let full = "eleven";
    let max = "three";
    if (league.draft1Live) {
      full = "fifteen";
    }
    const minTeamRequirements = DraftValidation.minTeamRequirements(
      league,
      manager,
      players,
      player
    );
    const myPick = DraftValidation.myPick(manager, league);
    const fullTeam = DraftValidation.fullTeam(league, manager);
    const maxPerTeam = DraftValidation.maxFromEachTeam(
      manager,
      players,
      player
    );
    const roleValidation = DraftValidation.roleValidation(
      league,
      manager,
      players,
      player
    );
    let batBowMax = "five";
    let arMax = "three";
    let wkMax = "one";

    //check this bit
    if (league.draft1Live) {
      batBowMax = "six";
      arMax = "four";
      wkMax = "two";
    }
    if (!fullTeam) {
      return `You already have ${full} players`;
    }
    if (!myPick) {
      return "Sorry, it is not your pick";
    }
    if (!roleValidation) {
      switch (player.role) {
        case "WK":
          return `You can only have a maximum ${wkMax} wicketkeepers.`;
        case "BT":
          return `You can only have a maximum ${batBowMax} batters`;
        case "BW":
          return `You can only have a maximum ${batBowMax} bowlers`;
        case "AR":
          return `You can only have a maximum ${arMax} all rounders`;
        default:
          return;
      }
    }
    if (!minTeamRequirements) {
      if (league.draft1Live) {
        return "You must pick a minimum of 4 batters, 4 bowlers, 2 all-rounders and 1 wicketkeeper";
      } else {
        return "You must pick a minimum of 3 batters, 3 bowlers, 1 all-rounders and 1 wicketkeeper";
      }
    }
    if (!maxPerTeam) {
      return `You can only pick ${max} players from each team`;
    }
    return "pass";
  }

  const getErrorModal = () => {
    if (selectedPlayer) {
      return (
        <>
          <Modal
            show
            onHide={handleCancel}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Error:</Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCancel}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    } else {
      return;
    }
  };

  const getConfirmPick = () => {
    return (
      <>
        <Modal
          show
          onHide={handleCancel}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Pick {selectedPlayer.name} for {manager.teamName}?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={selectPlayer}>
              Pick Player
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

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
      {showAutoPick && (
        <AutoPickModal
          closeModal={() => setShowAutoPick(false)}
          updateVidi={updateVidiprinter}
          updateLeague={updateLeague}
        />
      )}
      {showSkipped && <SkippedModal closeModal={() => setShowSkipped(false)} />}
      {showShortlistPick && (
        <ShortlistPickModal
          closeModal={() => setShowShortlistPick(false)}
          selectPlayer={handleSelectPlayer}
        />
      )}
      {showConfirmPick && getConfirmPick()}
      {showError && getErrorModal()}
      <DraftPageHeader
        skipPick={skipPick}
        live={true}
        showShortlistModal={() => setShowShortlistPick(true)}
        showAutoPickModal={() => setShowAutoPick(true)}
        resetTimer={resetTimer}
      />
      <div className="standard-width-container">
        <DraftTable
          updateLeague={updateLeague}
          selectPlayer={handleSelectPlayer}
        />
        <DraftFooter />
      </div>
    </>
  );
}
