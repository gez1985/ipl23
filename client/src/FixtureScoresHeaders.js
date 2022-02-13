import React from "react";

export default function FixtureScoresHeaders() {
  return (
    <div className="standard-width-container">
      <table className="fixed-table">
          <thead>
            <tr className="table-headers">
              <th scope="col">Name</th>
              <th scope="col" className="disappear-mobile">Runs</th>
              <th scope="col" className="disappear-mobile">Balls</th>
              <th scope="col" className="disappear-mobile">Strike Rate</th>
              <th scope="col" className="disappear-mobile">Catches</th>
              <th scope="col" className="disappear-mobile">Run Outs</th>
              <th scope="col" className="disappear-mobile">Overs</th>
              <th scope="col" className="disappear-mobile">Runs Conceded</th>
              <th scope="col" className="disappear-mobile">Wickets</th>
              <th scope="col" className="disappear-mobile">Maidens</th>
              <th scope="col" className="disappear-mobile">Economy</th>
              <th scope="col">Total Points</th>
            </tr>
          </thead>
        </table>
    </div>
  );
}
