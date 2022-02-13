import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function PlayerModal(props) {
  const tdInlineStyle = {
    textAlign: "left",
    paddingLeft: "30px",
    fontSize: "16px",
    fontWeight: "600",
  };

  const thInlineStyle = {
    fontFamily: '"Oswald", sans-serif',
    fontSize: '1.1em',
    fontWeight: '300',
    color: '#dd6d1f',
    textAlign: "right",
  };

  const modalContainerStyle = {
    display: "flex",
    justifyContent: "center",
    width: "99%",
    margin: "auto",
    padding: "20px 0",
  }

  return (
    <>
      <>
        <Modal show={true} onHide={props.hide} size="sm">
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">
              {props.player.name}
            </Modal.Title>
          </Modal.Header>
          <div className="flex-container modal-container" style={modalContainerStyle}>
            <table>
              <tbody className="modal-table">
                <tr>
                  <th style={thInlineStyle}>Role:</th>
                  <td style={tdInlineStyle}>{props.player.role}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Team:</th>
                  <td style={tdInlineStyle}>{props.player.team}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Appearances:</th>
                  <td style={tdInlineStyle}>{props.player.appearances}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Runs:</th>
                  <td style={tdInlineStyle}>{props.player.runs}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Fours:</th>
                  <td style={tdInlineStyle}>{props.player.fours}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Sixes:</th>
                  <td style={tdInlineStyle}>{props.player.sixes}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Overs:</th>
                  <td style={tdInlineStyle}>{props.player.overs}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Runs Conceded:</th>
                  <td style={tdInlineStyle}>{props.player.runsConceded}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Wickets:</th>
                  <td style={tdInlineStyle}>{props.player.wickets}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Maidens:</th>
                  <td style={tdInlineStyle}>{props.player.maidens}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Catches:</th>
                  <td style={tdInlineStyle}>{props.player.catches}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Part Run Outs:</th>
                  <td style={tdInlineStyle}>{props.player.partRunOuts}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Full Run Outs:</th>
                  <td style={tdInlineStyle}>{props.player.fullRunOuts}</td>
                </tr>
                {props.player.role === "WK" && (
                  <tr>
                    <th style={thInlineStyle}>Stumpings:</th>
                    <td style={tdInlineStyle}>{props.player.stumpings}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
    </>
  );
}
