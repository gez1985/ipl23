import React, { useContext } from "react";
import { SortContext } from "./Store";

export default function PlayersHeaders() {

  const [, setSort] = useContext(SortContext);

  return (
    <>
      <div className="standard-width-container">
        <table className="fixed-table">
          <thead>
            <tr className="table-headers">
              <th scope="col" className="cursor-pointer" onClick={() => setSort('name')}>Name</th>
              <th scope="col" className="cursor-pointer" onClick={() => setSort('role')}>Role</th>
              <th scope="col" className="cursor-pointer" onClick={() => setSort('team')}>Team</th>
              <th scope="col" className="cursor-pointer disappear-mobile" onClick={() => setSort('manager')}>Manager</th>
              <th scope="col" className="cursor-pointer disappear-mobile" onClick={() => setSort('runs')}>Runs</th>
              <th scope="col" className="cursor-pointer disappear-mobile" onClick={() => setSort('wickets')}>Wickets</th>
              <th scope="col" className="cursor-pointer disappear-mobile" onClick={() => setSort('catches')}>Catches</th>
              <th scope="col" className="cursor-pointer" onClick={() => setSort('totalPoints')}>Total Points</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}
