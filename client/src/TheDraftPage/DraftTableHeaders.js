import React, { useContext } from "react";
import { SortContext } from "../Store";

export default function DraftTableHeaders() {
  const [, setSort] = useContext(SortContext);

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
              <th scope="col">Pick Player?</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}
