import React, { useEffect, useContext } from "react";
import {
  PlayersContext,
  TeamsContext,
  ManagerContext,
  LeagueManagersContext as ManagersContext,
  SortContext,
  SearchNameContext,
  LeagueContext,
} from "../Store";
import Helpers from "../utils/Helpers";
import select from "../img/Select.png";
import DraftValidation from "./DraftValidation";
import selectAlt from "../img/SelectGrey.png";

const sortObjectsArray = require("sort-objects-array");

export default function DraftTable({ updateLeague, selectPlayer }) {
  const [players] = useContext(PlayersContext);
  const [teams] = useContext(TeamsContext);
  const [manager] = useContext(ManagerContext);
  const [managers] = useContext(ManagersContext);
  const [league] = useContext(LeagueContext);
  const [sort] = useContext(SortContext);
  const [searchName] = useContext(SearchNameContext);

  const sortedPlayerArray = getSortedPlayerArray();

  const myPick = DraftValidation.myPick(manager, league);

  useEffect(() => {
    if (
      league.draft1Live &&
      league.pickNumber === manager.stagePickNumber &&
      manager.stage1Squad.length >= 15
    ) {
      updateLeague();
    }
  });

  function getSortedPlayerArray() {
    const unpickedPlayers = Helpers.getUnpickedPlayers(
      managers,
      players,
      league
    );
    const namedPlayers = unpickedPlayers.filter((player) =>
      player.name.toLowerCase().includes(searchName)
    );
    switch (sort) {
      case "team":
        return sortObjectsArray(namedPlayers, "team");
      case "role":
        return sortObjectsArray(namedPlayers, "role");
      default:
        return sortObjectsArray(namedPlayers, "name");
    }
  }

  function renderTableRows(player) {
    return (
      <tr key={player.id}>
        <td>{player.name}</td>
        <td>{player.role}</td>
        <td>{Helpers.getNameById(teams, player.teamId)}</td>
        <td>
          <img
            className="select-icon"
            src={myPick ? select : selectAlt}
            alt="home"
            onClick={myPick ? () => selectPlayer(player) : null}
            style={{ cursor: myPick ? "pointer" : null }}
          />
        </td>
      </tr>
    );
  }

  return (
    <div className="draft-container">
      <table className="fixed-table">
        <tbody>
          {sortedPlayerArray.map((player) => renderTableRows(player))}
        </tbody>
      </table>
    </div>
  );
}
