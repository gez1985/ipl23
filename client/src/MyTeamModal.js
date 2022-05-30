import React, { useContext, useState, useEffect } from "react";
import {
  PlayersContext,
  TeamsContext,
  ManagerContext,
  LeagueContext,
} from "./Store";
import Helpers from "./utils/Helpers";
import { Button, Modal } from "react-bootstrap";

export default function MyTeamModal(props) {
  const [players] = useContext(PlayersContext);
  const [teams] = useContext(TeamsContext);
  const [manager] = useContext(ManagerContext);
  const [league] = useContext(LeagueContext);
  const [myPlayers, setMyPlayers] = useState([]);

  useEffect(() => {
    const playersToSet = [];
    if (league.draft1Live) {
      manager.stage1Squad.forEach((id) =>
        playersToSet.push(Helpers.getObjectById(players, id))
      );
    }
    setMyPlayers(playersToSet);
  }, []);

  const tdInlineStyle = {
    textAlign: "center",
    paddingLeft: "30px",
    fontSize: "16px",
    fontWeight: "600",
    padding: "10px",
  };

  const thInlineStyle = {
    fontFamily: '"Oswald", sans-serif',
    fontSize: "1.1em",
    fontWeight: "300",
    color: "#dd6d1f",
    textAlign: "center",
    padding: "10px",
  };

  const modalContainerStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "20px 0",
  };

  const myBatters = myPlayers.filter((player) => player.role === "BT");
  const myAllRounders = myPlayers.filter((player) => player.role === "AR");
  const myWicketKeepers = myPlayers.filter((player) => player.role === "WK");
  const myBowlers = myPlayers.filter((player) => player.role === "BW");

  function renderTableRows(player) {
    return (
      <tr key={player.id} className="table-row">
        <td style={tdInlineStyle}>{player.name}</td>
        <td style={tdInlineStyle}>{player.role}</td>
        <td style={tdInlineStyle}>{Helpers.getNameById(teams, player.teamId)}</td>
      </tr>
    );
  }

  return (
    <div>
      <Modal show={true} onHide={props.hide} size="sm">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">{manager.teamName}:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={modalContainerStyle}><table className="fixed-table">
            <thead>
              <tr>
                <th style={thInlineStyle}>Name</th>
                <th style={thInlineStyle}>Role</th>
                <th style={thInlineStyle}>Team</th>
              </tr>
            </thead>
            <tbody>
              {myBatters.map((playerId) => renderTableRows(playerId))}
              {myAllRounders.map((playerId) => renderTableRows(playerId))}
              {myWicketKeepers.map((playerId) => renderTableRows(playerId))}
              {myBowlers.map((playerId) => renderTableRows(playerId))}
            </tbody>
          </table></div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="modal-button"
            variant="secondary"
            onClick={props.hide}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
