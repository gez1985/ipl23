import React, { useContext, useState, useEffect } from "react";
import {
  LeagueContext,
  PlayersContext,
  LeagueManagersContext as ManagersContext,
  SortContext,
  SearchNameContext,
  IncludeContext,
} from "../Store";
import PlayerModal from "../PlayerModal";
import Helpers from "../utils/Helpers";
import { IoPersonAdd } from "react-icons/io5";
import { IconContext } from "react-icons";
const sortObjectsArray = require("sort-objects-array");

export default function Players({ handleShortlistClick }) {
  const [league] = useContext(LeagueContext);
  const [players] = useContext(PlayersContext);
  const [managers] = useContext(ManagersContext);
  const [sort] = useContext(SortContext);
  const [searchName] = useContext(SearchNameContext);
  const [include] = useContext(IncludeContext);
  const [showPlayer, setShowPlayer] = useState(false);
  const [player, setPlayer] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    Helpers.getPlayersManager(players, managers);
  }, []);

  const sortedPlayerArray = getSortedPlayerArray();

  function getSortedPlayerArray() {
    const namedPlayers = players.filter((player) =>
      player.name.toLowerCase().includes(searchName.toLowerCase())
    );
    let filteredArray = [];
    if (include === "allPlayers") {
      filteredArray = namedPlayers;
    } else if (include === "drafted") {
      filteredArray = namedPlayers.filter(
        (player) => player.manager !== "Not Selected"
      );
    } else if (include === "notSelected") {
      filteredArray = namedPlayers.filter(
        (player) => player.manager === "Not Selected"
      );
    }
    switch (sort) {
      case "team":
        return sortObjectsArray(filteredArray, "team");
      case "role":
        return sortObjectsArray(filteredArray, "role");
      case "manager":
        return sortObjectsArray(filteredArray, "manager");
      case "runs":
        return sortObjectsArray(filteredArray, "runs", "desc");
      case "wickets":
        return sortObjectsArray(filteredArray, "wickets", "desc");
      case "catches":
        return sortObjectsArray(filteredArray, "catches", "desc");
      case "totalPoints":
        return sortObjectsArray(filteredArray, "totalPoints", "desc");
      default:
        return sortObjectsArray(filteredArray, "name");
    }
  }

  function handlePlayerClick(player) {
    setShowPlayer(true);
    setPlayer(player);
  }

  function handleHide() {
    setShowPlayer(false);
    setPlayer();
  }

  function getDraftStatus() {
    if (league.draft1Live) {
      return false;
    } else {
      return true;
    }
  }

  function renderTableRows(player) {
    return (
      <tr key={player.id} className="table-row">
        <td
          className="cursor-pointer"
          onClick={() => handlePlayerClick(player)}
        >
          {player.name}
        </td>
        <td>{player.role}</td>
        <td>{player.team}</td>
        <td className="disappear-mobile">{player.manager}</td>
        <td className="disappear-mobile">{player.runs}</td>
        <td className="disappear-mobile">{player.wickets}</td>
        <td className="disappear-mobile">{player.catches}</td>
        <td>{player.totalPoints}</td>
        {getDraftStatus() && (
          <>
            <td className="disappear-mobile">
              <div className="shortlist-icon-container">
                <IconContext.Provider
                  value={{ size: "1.3rem", color: "#666", cursor: "pointer" }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleShortlistClick(player)}
                  >
                    <IoPersonAdd />
                  </div>
                </IconContext.Provider>
              </div>
            </td>
          </>
        )}
      </tr>
    );
  }

  return (
    <>
      {showPlayer && <PlayerModal hide={handleHide} player={player} />}
      <div className="standard-width-container">
        <table className="fixed-table">
          <tbody>
            {sortedPlayerArray.map((player) => renderTableRows(player))}
          </tbody>
        </table>
      </div>
    </>
  );
}
