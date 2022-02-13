import React, { useContext, useEffect, useState } from "react";
import Helpers from "./utils/Helpers";
import Scores from "./utils/Scores";
import { PlayersContext, ScoresContext } from "./Store";
import PlayerScoreModal from './PlayerScoreModal';

export default function TeamScores(props) {
  const [players] = useContext(PlayersContext);
  const [scores] = useContext(ScoresContext);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const matchScores = scores.filter(
    (score) => score.fixtureId === props.fixtureId
  );
  const playerIds = Helpers.getPlayerIdsFromTeamId(players, props.teamId);
  const teamScores = matchScores.filter((score) =>
    playerIds.includes(score.playerId)
  );

  function handlePlayerClick(score) {
    setShowScore(true);
    setScore(score);
  }

  function handleHide() {
    setShowScore(false);
    setScore();
  }

  function renderTableRows(score) {
    const player = Helpers.getObjectById(players, score.playerId);
    let strikeRate = Number(((score.runs / score.balls) * 100).toFixed(2));
    const runOuts = score.partRunOuts + score.fullRunOuts;
    let economy = Number((score.runsConceded / score.overs).toFixed(2));
    if (isNaN(strikeRate)) {
      strikeRate = null;
    }
    if (isNaN(economy)) {
      economy = null;
    }
    return (
      <tr key={score.id} className="scores-table table-row">
        <td className="cursor-pointer" onClick={() => handlePlayerClick(score)}>{Helpers.getNameById(players, score.playerId)}</td>
        <td className="disappear-mobile">{score.runs}</td>
        <td className="disappear-mobile">{score.balls}</td>
        <td className="disappear-mobile">{strikeRate}</td>
        <td className="disappear-mobile">{score.catches}</td>
        <td className="disappear-mobile">{runOuts}</td>
        <td className="disappear-mobile">{score.overs}</td>
        <td className="disappear-mobile">{score.runsConceded}</td>
        <td className="disappear-mobile">{score.wickets}</td>
        <td className="disappear-mobile">{score.maidens}</td>
        <td className="disappear-mobile">{economy}</td>
        <td>{Scores.getScorePoints(player, score)}</td>
      </tr>
    );
  }

  if (!teamScores.length && props.home) {
    return (
      <div className="no-scores">Match report not yet available</div>
    );
  }

  return (
    <>
    {showScore && <PlayerScoreModal hide={handleHide} score={score}/>}
      <div>
        <table className="fixed-table">
          <tbody>{teamScores.map((score) => renderTableRows(score))}</tbody>
        </table>
      </div>
    </>
  );
}
