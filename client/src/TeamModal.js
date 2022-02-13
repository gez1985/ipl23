import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function TeamModal(props) {

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
              {props.manager.teamName}
            </Modal.Title>
          </Modal.Header>
          <div className="flex-container modal-container" style={modalContainerStyle}>
            <table>
              <tbody className="modal-table">
                <tr>
                  <th style={thInlineStyle}>Manager:</th>
                  <td style={tdInlineStyle}>{props.manager.name}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Total Points:</th>
                  <td style={tdInlineStyle}>{props.manager.totalPoints}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Best Eleven Points:</th>
                  <td style={tdInlineStyle}>{props.manager.stage1Points}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Appearances:</th>
                  <td style={tdInlineStyle}>{props.manager.appearances}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Runs:</th>
                  <td style={tdInlineStyle}>{props.manager.runs}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Fours:</th>
                  <td style={tdInlineStyle}>{props.manager.fours}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Sixes:</th>
                  <td style={tdInlineStyle}>{props.manager.sixes}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Catches:</th>
                  <td style={tdInlineStyle}>{props.manager.catches}</td>
                </tr>
                {/* <tr>
                  <th style={thInlineStyle}>Part Run Outs::</th>
                  <td style={tdInlineStyle}>{props.manager.partRunOuts}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Full Run Outs:</th>
                  <td style={tdInlineStyle}>{props.manager.fullRunOuts}</td>
                </tr> */}
                <tr>
                  <th style={thInlineStyle}>Stumpings:</th>
                  <td style={tdInlineStyle}>{props.manager.stumpings}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Overs:</th>
                  <td style={tdInlineStyle}>{props.manager.overs}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Runs Conceded:</th>
                  <td style={tdInlineStyle}>{props.manager.runsConceded}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Wickets:</th>
                  <td style={tdInlineStyle}>{props.manager.wickets}</td>
                </tr>
                <tr>
                  <th style={thInlineStyle}>Maidens:</th>
                  <td style={tdInlineStyle}>{props.manager.maidens}</td>
                </tr>
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
