import React, { useContext } from "react";
import { SortContext, LeagueContext } from "../Store";

export default function PlayersHeaders() {
  const [, setSort] = useContext(SortContext);
  const [league] = useContext(LeagueContext);

  const getDraftStatus = () => {
    if (league.draft1Live || league.draft2Live || league.draft3Live) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <div className="standard-width-container">
        <table className="fixed-table">
          <thead>
            <tr className="table-headers">
              <th
                scope="col"
                className="cursor-pointer"
                onClick={() => setSort("name")}
              >
                Name
              </th>
              <th
                scope="col"
                className="cursor-pointer"
                onClick={() => setSort("role")}
              >
                Role
              </th>
              <th
                scope="col"
                className="cursor-pointer"
                onClick={() => setSort("team")}
              >
                Team
              </th>
              <th
                scope="col"
                className="cursor-pointer disappear-mobile"
                onClick={() => setSort("manager")}
              >
                Manager
              </th>
              <th
                scope="col"
                className="cursor-pointer disappear-mobile"
                onClick={() => setSort("runs")}
              >
                Runs
              </th>
              <th
                scope="col"
                className="cursor-pointer disappear-mobile"
                onClick={() => setSort("wickets")}
              >
                Wickets
              </th>
              <th
                scope="col"
                className="cursor-pointer disappear-mobile"
                onClick={() => setSort("catches")}
              >
                Catches
              </th>
              <th
                scope="col"
                className="cursor-pointer"
                onClick={() => setSort("totalPoints")}
              >
                Total Points
              </th>
              {getDraftStatus() && (
                <>
                  <th scope="col" className="cursor-pointer disappear-mobile">
                    Shortlist
                  </th>
                </>
              )}
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}
