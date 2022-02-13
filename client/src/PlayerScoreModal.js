import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { PlayersContext } from "./Store";
import Helpers from "./utils/Helpers";
import Scores from "./utils/Scores";

export default function PlayerScoreModal(props) {
  const [players] = useContext(PlayersContext);

  const player = Helpers.getObjectById(players, props.score.playerId);

  const tdInlineStyle = {
    textAlign: "left",
    paddingLeft: "30px",
    fontSize: "16px",
    fontWeight: "600",
  };

  const thInlineStyle = {
    fontFamily: '"Oswald", sans-serif',
    fontSize: "1.1em",
    fontWeight: "300",
    color: "#dd6d1f",
    textAlign: "right",
  };

  const modalContainerStyle = {
    display: "flex",
    justifyContent: "center",
    width: "99%",
    margin: "auto",
    padding: "20px 0",
  };

  let strikeRate = Number(
    ((props.score.runs / props.score.balls) * 100).toFixed(2)
  );
  let economy = Number(
    (props.score.runsConceded / props.score.overs).toFixed(2)
  );
  if (isNaN(strikeRate)) {
    strikeRate = null;
  }
  if (isNaN(economy)) {
    economy = null;
  }

  return (
    <>
      <Modal show={true} onHide={props.hide} size="sm">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">{player.name}:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="flex-container modal-container"
            style={modalContainerStyle}
          >
            <table>
              <tbody className="modal-table">
                <tr>
                  <th style={thInlineStyle}>Runs:</th>
                  <td style={tdInlineStyle}>{props.score.runs}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Balls:</th>
                  <td style={tdInlineStyle}>{props.score.balls}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Fours:</th>
                  <td style={tdInlineStyle}>{props.score.fours}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Sixes:</th>
                  <td style={tdInlineStyle}>{props.score.sixes}</td>
                </tr>
                {strikeRate && (
                  <tr>
                    <th style={thInlineStyle}>Strike Rate:</th>
                    <td style={tdInlineStyle}>{strikeRate}</td>
                  </tr>
                )}
                <tr>
                  <th style={thInlineStyle}>Catches:</th>
                  <td style={tdInlineStyle}>{props.score.catches}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Part Run Outs:</th>
                  <td style={tdInlineStyle}>{props.score.partRunOuts}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Full Run Outs:</th>
                  <td style={tdInlineStyle}>{props.score.fullRunOuts}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Stumpings:</th>
                  <td style={tdInlineStyle}>{props.score.stumpings}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Overs:</th>
                  <td style={tdInlineStyle}>{props.score.overs}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Runs Conceded:</th>
                  <td style={tdInlineStyle}>{props.score.runsConceded}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Wickets:</th>
                  <td style={tdInlineStyle}>{props.score.wickets}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Maidens:</th>
                  <td style={tdInlineStyle}>{props.score.maidens}</td>
                </tr>
                {economy && (
                  <tr>
                    <th style={thInlineStyle}>Economy:</th>
                    <td style={tdInlineStyle}>{economy}</td>
                  </tr>
                )}
                <tr>
                  <th style={thInlineStyle}>Total Points:</th>
                  <td style={tdInlineStyle}>
                    {Scores.getScorePoints(player, props.score)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
    </>
  );
}
