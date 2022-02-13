import React, { useEffect, useContext, useState } from "react";
import PlayerModal from "./PlayerModal";
import { ManagerContext, PlayersContext } from "./Store";
import Helpers from "./utils/Helpers";

export default function MyTeam() {
  const [manager] = useContext(ManagerContext);
  const [players] = useContext(PlayersContext);
  const [myPlayers, setMyPlayers] = useState([]);
  const [mySubs, setMySubs] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const [player, setPlayer] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    const subIds = manager.stage1Squad.filter(
      (playerId) => !manager.stage1BestEleven.includes(playerId)
    );
    const playersToSet = [];
    const subsToSet = [];
    manager.stage1BestEleven.forEach((id) =>
      playersToSet.push(Helpers.getObjectById(players, id))
    );
    subIds.forEach((id) => 
      subsToSet.push(Helpers.getObjectById(players, id))
    );
    setMyPlayers(playersToSet);
    setMySubs(subsToSet);
  }, []);

  const myBatters = myPlayers.filter((player) => player.role === "BT");
  const myAllRounders = myPlayers.filter((player) => player.role === "AR");
  const myWicketKeepers = myPlayers.filter((player) => player.role === "WK");
  const myBowlers = myPlayers.filter((player) => player.role === "BW");

  function handlePlayerClick(player) {
    setShowPlayer(true);
    setPlayer(player);
  }

  function handleHide() {
    setShowPlayer(false);
    setPlayer();
  }

  function renderTableRows(player) {
    return (
      <tr className="my-team-removal table-row" key={player.id}>
        <td>{player.role}</td>
        <td
          className="cursor-pointer"
          onClick={() => handlePlayerClick(player)}
        >
          {player.name}
        </td>
        <td>{player.team}</td>
        <td>{player.appearances}</td>
        <td>{player.runs}</td>
        <td>{player.wickets}</td>
        <td>{player.catches}</td>
        <td>{player.partRunOuts + player.fullRunOuts}</td>
        <td>{player.totalPoints}</td>
      </tr>
    );
  }

  return (
    <>
      {showPlayer && <PlayerModal hide={handleHide} player={player} />}
      <div className="standard-width-container">
        <table className="fixed-table">
          <tbody>
            {myBatters.map((player) => renderTableRows(player))}
            {myAllRounders.map((player) => renderTableRows(player))}
            {myWicketKeepers.map((player) => renderTableRows(player))}
            {myBowlers.map((player) => renderTableRows(player))}
            {mySubs.map((player) => renderTableRows(player))}
          </tbody>
          <tfoot>
            <tr className="my-team-removal fixed-bottom table-footers">
              <th></th>
              <th></th>
              <th>Total</th>
              <th>{manager.appearances}</th>
              <th>{manager.runs}</th>
              <th>{manager.wickets}</th>
              <th>{manager.catches}</th>
              <th>{manager.runOuts}</th>
              <th>{manager.totalPoints}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
