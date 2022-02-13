import React, { useEffect, useContext, useState } from "react";
import TeamModal from "./TeamModal";
import { ManagersContext } from "./Store";
const sortObjectsArray = require("sort-objects-array");

export default function LeagueTable() {
  const [managers] = useContext(ManagersContext);
  const [showManager, setShowManager] = useState(false);
  const [leagueManager, setLeagueManager] = useState();

  const sortedManagers = sortObjectsArray(managers, "stage1Points", "desc");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleManagerClick(manager) {
    setShowManager(true);
    setLeagueManager(manager);
  }

  function handleHide() {
    setShowManager(false);
    setLeagueManager();
  }

  function renderTableRows(manager, managerIndex) {
    return (
      <tr className="table-row" key={manager.id}>
        <td>{managerIndex + 1}</td>
        <td className="cursor-pointer" onClick={() => handleManagerClick(manager)}>{manager.teamName}<br/><span className="manager-name disappear-mobile">{manager.name}</span></td>
        <td>{manager.stage1Points}</td>
      </tr>
    );
  }

  return (
    <>
      {showManager && <TeamModal hide={handleHide} manager={leagueManager}/>}
      <div className="standard-width-container">
        <table className="fixed-table">
          <tbody>
            {sortedManagers.map((manager, managerIndex) => renderTableRows(manager, managerIndex))}
          </tbody>
        </table>
      </div>
    </>
  );
}
