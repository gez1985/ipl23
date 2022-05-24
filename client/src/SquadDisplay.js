import React, { useContext, useState } from "react";
import styled from "styled-components";
import { PlayersContext, TeamsContext } from "./Store";
import Helpers from "./utils/Helpers";
import PlayerModal from "./PlayerModal";

export default function SquadDisplay(props) {
  const [players] = useContext(PlayersContext);
  const [teams] = useContext(TeamsContext);
  const [showPlayer, setShowPlayer] = useState(false);
  const [player, setPlayer] = useState();

  const bestEleven = [];
  const subs = [];
  let border;

  if (props.stage === 1) {
    const stage1Subs = props.manager.stage1Squad.filter(
      (playerId) => !props.manager.stage1BestEleven.includes(playerId)
    );
    props.manager.stage1BestEleven.forEach((playerId) =>
      bestEleven.push(Helpers.getObjectById(players, playerId))
    );
    stage1Subs.forEach((playerId) =>
      subs.push(Helpers.getObjectById(players, playerId))
    );
    border = "squads-row";
  }
  if (props.stage === 2) {
    const stage2Subs = props.manager.stage2Squad.filter(
      (playerId) => !props.manager.stage2BestEleven.includes(playerId)
    );
    props.manager.stage2BestEleven.forEach((playerId) =>
      bestEleven.push(Helpers.getObjectById(players, playerId))
    );
    stage2Subs.forEach((playerId) =>
      subs.push(Helpers.getObjectById(players, playerId))
    );
    border = "squads-row";
  }
  if (props.stage === 3) {
    const stage3Subs = props.manager.stage3Squad.filter(
      (playerId) => !props.manager.stage3BestEleven.includes(playerId)
    );
    props.manager.stage3BestEleven.forEach((playerId) =>
      bestEleven.push(Helpers.getObjectById(players, playerId))
    );
    stage3Subs.forEach((playerId) =>
      subs.push(Helpers.getObjectById(players, playerId))
    );
    border = "squads-row";
  }

  const batters = bestEleven.filter((player) => player.role === "BT");
  const allRounders = bestEleven.filter((player) => player.role === "AR");
  const wicketkeepers = bestEleven.filter((player) => player.role === "WK");
  const bowlers = bestEleven.filter((player) => player.role === "BW");

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
      <tr key={player.id} className={border}>
        <td>{player.role}</td>
        <td
          className="cursor-pointer"
          onClick={() => handlePlayerClick(player)}
        >
          {player.name}
        </td>
        <td>{Helpers.getNameById(teams, player.teamId)}</td>
        {props.stage === 1 && <td>{player.totalPoints}</td>}
        {props.stage === 2 && <td>{player.stage2Points}</td>}
        {props.stage === 3 && <td>{player.stage3Points}</td>}
      </tr>
    );
  }

  return (
    <>
      {showPlayer && <PlayerModal hide={handleHide} player={player} />}
      <SquadContainer>
        <SquadHeader>
          <TeamName>{props.manager.teamName}</TeamName>
          <div className="flex-container space-between">
            <ManagerDetails>{props.manager.name}</ManagerDetails>
            {props.stage === 1 ? (
              <TopScorerDetails>
                Top Scorer: {props.manager.topScorer} -{" "}
                {props.manager.topScorerPoints} pts
              </TopScorerDetails>
            ) : null}
          </div>
        </SquadHeader>
        <table className="squads-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Name</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {batters.map((player) => renderTableRows(player))}
            {allRounders.map((player) => renderTableRows(player))}
            {wicketkeepers.map((player) => renderTableRows(player))}
            {bowlers.map((player) => renderTableRows(player))}
            {subs.map((player) => renderTableRows(player))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th>Total</th>
              {props.stage === 1 && <th>{props.manager.stage1Points}</th>}
              {props.stage === 2 && <th>{props.manager.stage2Points}</th>}
              {props.stage === 3 && <th>{props.manager.stage3Points}</th>}
            </tr>
          </tfoot>
        </table>
      </SquadContainer>
    </>
  );
}

const SquadContainer = styled.div`
  width: 500px;
  margin: 20px 10px 0 10px;
  border-radius: 7px;
  @media screen and (max-width: 1024px) {
    margin: 0 0 10px 0;
  }
`;

const SquadHeader = styled.div`
  background-color: #dd6d1f;
  color: white;
  text-align: left;
  padding: 7px;
  border-radius: 7px 7px 0 0;
`;

const TeamName = styled.div`
  font-family: "Oswald", sans-serif;
  font-size: 28px;
  font-weight: 400;
  text-transform: uppercase;
  @media screen and (max-width: 1024px) {
    font-size: 24px;
  }
`;

const ManagerDetails = styled.div`
  font-size: 20px;
  font-style: italic;
`;

const TopScorerDetails = styled.div`
  font-size: 16px;
  font-weight: 500;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
