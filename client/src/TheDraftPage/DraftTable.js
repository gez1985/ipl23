import React, { useEffect, useState, useContext } from "react";
import {
  PlayersContext,
  TeamsContext,
  ManagerContext,
  ManagersContext,
  SortContext,
  SearchNameContext,
  LeagueContext,
} from "../Store";
import Helpers from "../utils/Helpers";
import PickValidation from "../utils/PickValidation";
import Search from "../utils/search";
import DraftValidation from "./DraftValidation";
import select from "../img/Select.png";
import { Button, Modal } from "react-bootstrap";
const sortObjectsArray = require("sort-objects-array");

export default function DraftTable({ updateLeague }) {
  const [players] = useContext(PlayersContext);
  const [teams] = useContext(TeamsContext);
  const [manager, setManager] = useContext(ManagerContext);
  const [managers, setManagers] = useContext(ManagersContext);
  const [league, setLeague] = useContext(LeagueContext);
  const [sort] = useContext(SortContext);
  const [searchName] = useContext(SearchNameContext);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [showConfirmPick, setShowConfirmPick] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showError, setShowError] = useState(false);

  const sortedPlayerArray = getSortedPlayerArray();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (league.draft2Live || league.draft3Live) {
      const managerCopy = JSON.parse(JSON.stringify(manager));
      if (league.draft2Live) {
        Helpers.pushQualifiedPlayers(managerCopy, league, players);
      }
      if (league.draft3Live) {
        Helpers.pushQualifiedPlayers(managerCopy, league, players);
      }
      setManager(managerCopy);
      const newManagers = managers.filter((man) => man.id !== manager.id);
      newManagers.push(managerCopy);
      setManagers(newManagers);
      updateManager(managerCopy);

      async function updateManager(managerToUpdate) {
        try {
          await Search.putManager(managerToUpdate);
        } catch (err) {
          console.error(err.message);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (
      league.draft1Live &&
      league.pickNumber === manager.stagePickNumber &&
      manager.stage1Squad.length >= 15
    ) {
      updateLeague();
    }
    if (
      league.draft2Live &&
      league.pickNumber === manager.stagePickNumber &&
      manager.stage2Squad.length >= 11
    ) {
      updateLeague();
    }
    if (
      league.draft3Live &&
      league.pickNumber === manager.finalPickNumber &&
      manager.stage3Squad.length >= 11
    ) {
      updateLeague();
    }
  });

  function getSortedPlayerArray() {
    const unpickedPlayers = Helpers.getUnpickedPlayers(
      managers,
      players,
      league
    );
    const namedPlayers = unpickedPlayers.filter((player) =>
      player.name.toLowerCase().includes(searchName)
    );
    switch (sort) {
      case "team":
        return sortObjectsArray(namedPlayers, "team");
      case "role":
        return sortObjectsArray(namedPlayers, "role");
      default:
        return sortObjectsArray(namedPlayers, "name");
    }
  }

  function handleSelectPlayer(player) {
    const validPickMessage = pickValidation(player);
    setErrorMessage(validPickMessage);
    setSelectedPlayer(player);
    if (validPickMessage === "pass") {
      setShowConfirmPick(true);
    } else {
      setShowError(true);
    }
  }

  function handleCancel() {
    setShowError(false);
    setShowConfirmPick(false);
    setSelectedPlayer();
  }

  async function selectPlayer() {
    const validPick = PickValidation(league, manager, selectedPlayer);
    if (!validPick) {
      handleCancel();
      alert("an error occured");
      return;
    }
    const managerCopy = JSON.parse(JSON.stringify(manager));
    if (league.draft1Live) {
      managerCopy.stage1Squad.push(selectedPlayer.id);
    } else if (league.draft2Live) {
      managerCopy.stage2Squad.push(selectedPlayer.id);
    } else if (league.draft3Live) {
      managerCopy.stage3Squad.push(selectedPlayer.id);
    } else {
      console.log(`error no draft live found`);
    }
    setManager(managerCopy);
    const newManagers = managers.filter((man) => man.id !== manager.id);
    newManagers.push(managerCopy);
    setManagers(newManagers);
    await Search.putManager(managerCopy);
    updateLeague();
    updateVidiprinter();
    handleCancel();
  }

  async function updateVidiprinter() {
    const vidiEntry = {
      leagueId: league.id,
      managerId: manager.id,
      playerId: selectedPlayer.id,
    };
    try {
      await Search.postVidiprinter(vidiEntry);
    } catch (err) {
      console.log(err.message);
    }
  }

  function pickValidation(player) {
    let full = "eleven";
    let max = "three";
    if (league.draft1Live) {
      full = "fifteen";
    }
    if (league.draft2Live) {
      max = "four";
    } else if (league.draft3Live) {
      max = "eleven";
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
      league,
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


  function renderErrorModal() {
    if (selectedPlayer) {
      return (
        <>
          <Modal show onHide={handleCancel} backdrop="static" keyboard={false}>
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
  }

  function renderConfirmPickModal() {
    return (
      <>
        <Modal show onHide={handleCancel} backdrop="static" keyboard={false}>
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
  }

  function renderTableRows(player) {
    return (
      <tr key={player.id}>
        <td>{player.name}</td>
        <td>{player.role}</td>
        <td>{Helpers.getNameById(teams, player.teamId)}</td>
        <td>
          <img
            className="select-icon cursor-pointer"
            src={select}
            alt="home"
            onClick={() => handleSelectPlayer(player)}
          />
        </td>
      </tr>
    );
  }

  return (
    <>
      {showError && renderErrorModal()}
      {showConfirmPick && renderConfirmPickModal()}
      <div className="draft-container">
        <table className="fixed-table">
          <tbody>
            {sortedPlayerArray.map((player) => renderTableRows(player))}
          </tbody>
        </table>
      </div>
    </>
  );
}
