import React, { useContext } from "react";
import { SearchNameContext } from "../Store";

export default function SemiShortlistTitle({ title }) {
  const [searchName, setSearchName] = useContext(SearchNameContext);

  return (
    <div className="players-header">
      <div className="flex-container space-between">
        <div className="shortlist-page-input-container">
          <input
            type="text"
            placeholder="Search by name:"
            className="player-search"
            onChange={(e) => setSearchName(e.target.value)}
            defaultValue={searchName}
          ></input>
        </div>
        <div className="page-title">{title}</div>
        <div className="shortlist-page-input-container"></div>
      </div>
    </div>
  );
}
