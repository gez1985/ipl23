import React from "react";

export default function MyTeamHeaders() {
  return (
    <>
      <div className="standard-width-container">
        <table className="fixed-table">
          <thead>
            <tr className="my-team-removal table-headers">
              <th scope="col">Role</th>
              <th scope="col">Name</th>
              <th scope="col">Team</th>
              <th scope="col">Appearances</th>
              <th scope="col">Runs</th>
              <th scope="col">Wickets</th>
              <th scope="col">Catches</th>
              <th scope="col">Run Outs</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}
