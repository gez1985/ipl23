import React, { useContext } from "react";
import {
  LeagueManagersContext as ManagersContext,
  LeagueContext,
  PlayersContext,
} from "../Store";
import { Button, Modal } from "react-bootstrap";
import sortObjectsArray from "sort-objects-array";
import Search from "../utils/search";
import { pickSemiPlayer } from "./pickSemiPlayers";
import { pickFinalPlayer } from "./pickFinalPlayers";

export default function DrawSemiSquadsModal({ hide, from }) {
  const [league] = useContext(LeagueContext);
  const [managers, setManagers] = useContext(ManagersContext);
  const [players] = useContext(PlayersContext);

  const handleDrawSquads = () => {
    if (from === "semi") {
      drawSemiSquads();
    } else if (from === "final") {
      console.log("draw final squads clicked");
      drawFinalSquads();
    } else {
      alert("error with from prop");
    }
    hide();
  };

  const drawSemiSquads = () => {
    const semiManagers = managers.filter((manager) =>
      league.stage2Managers.flat().includes(manager.id)
    );
    const validDraw = validateSemiDraw();
    if (!validDraw) {
      alert("please check managers and teams are entered");
      return;
    }
    assignSemiPickNumbers(semiManagers);
    pickSemiSquads(semiManagers);
  };

  const assignSemiPickNumbers = (semiManagers) => {
    const sortedManagers = sortObjectsArray(
      semiManagers,
      "stage1Points",
      "desc"
    );
    sortedManagers.forEach((manager, index) => {
      manager.semiPickNumber = index + 1;
    });
  };

  const assignFinalPickNumbers = (finalManagers) => {
    const sortedManagers = sortObjectsArray(
      finalManagers,
      "stage1Points",
      "desc"
    );
    sortedManagers.forEach((manager, index) => {
      manager.finalPickNumber = index + 1;
    });
  };

  const pickSemiSquads = async (semiManagers) => {
    console.log('picking semi squads...')
    const copyOfManagers = JSON.parse(JSON.stringify(semiManagers));
    const qualifiedPlayers = players.filter((player) =>
      league.stage2Teams.includes(player.teamId)
    );
    for (let i = 0; i < 56; i++) {
      const pickingNumber = (i % 4) + 1;
      const pickingManager = copyOfManagers.find(
        (manager) => manager.semiPickNumber === pickingNumber
      );
      pickSemiPlayer(pickingManager, copyOfManagers, qualifiedPlayers);
    }
    setManagers(copyOfManagers);
    try {
      await Promise.all(
        copyOfManagers.map(async (manager) => {
          await Search.putManager(manager);
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const pickFinalSquads = async (finalManagers) => {
    const copyOfManagers = JSON.parse(JSON.stringify(finalManagers));
    const qualifiedPlayers = players.filter((player) =>
      league.stage3Teams.includes(player.teamId)
    );
    for (let i = 0; i < 24; i++) {
      const pickingNumber = (i % 2) + 1;
      const pickingManager = copyOfManagers.find(
        (manager) => manager.finalPickNumber === pickingNumber
      );
      pickFinalPlayer(pickingManager, copyOfManagers, qualifiedPlayers);
    }
    setManagers(copyOfManagers);
    try {
      await Promise.all(
        copyOfManagers.map(async (manager) => {
          await Search.putManager(manager);
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const drawFinalSquads = () => {
    const finalManagers = managers.filter((manager) =>
      league.stage3Managers.flat().includes(manager.id)
    );
    const validDraw = validateFinalDraw();
    if (!validDraw) {
      alert("please check managers and teams are entered");
      return;
    }
    assignFinalPickNumbers(finalManagers);
    pickFinalSquads(finalManagers);
  };

  const validateSemiDraw = () => {
    if (league.stage2Teams.length !== 4) {
      return false;
    }
    if (league.stage2Managers.flat().length !== 4) {
      return false;
    }
    return true;
  };

  const validateFinalDraw = () => {
    if (league.stage3Teams.length !== 2) {
      return false;
    }
    if (league.stage3Managers.flat().length !== 2) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Modal show onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Draw {from} squads:</Modal.Title>
        </Modal.Header>
        <Modal.Body>Have you set the {from} teams and managers?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDrawSquads}>
            Draw Squads
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
