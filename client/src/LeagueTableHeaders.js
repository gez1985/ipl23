import React from "react";

export default function LeagueTableHeaders() {
  return (
    <>
      <div className="standard-width-container">
        <table className="fixed-table">
          <thead>
            <tr className="my-team-removal table-headers">
              <th scope="col">Rank</th>
              <th scope="col">Team<span className="disappear-mobile"> and Manager</span></th>
              <th scope="col">Total Points</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}
