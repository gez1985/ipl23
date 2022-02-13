import React, { useContext } from "react";
import {
  FixturesContext,
  LeagueContext,
  ManagerContext,
  ManagersContext,
  PlayersContext,
  ScoresContext,
  TeamsContext,
  VidiprinterContext,
} from "../Store";

const TestComponent = () => {
  const [players, setPlayers] = useContext(PlayersContext);
  const [scores, setScores] = useContext(ScoresContext);
  const [fixtures, setFixtures] = useContext(FixturesContext);
  const [teams, setTeams] = useContext(TeamsContext);
  const [managers, setManagers] = useContext(ManagersContext);
  const [manager, setManager] = useContext(ManagerContext);
  const [league, setLeague] = useContext(LeagueContext);
  const [vidiprinter, setVidiprinter] = useContext(VidiprinterContext);

  const handleClick = () => {
    console.log(players);
    console.log(scores);
    console.log(fixtures);
    console.log(teams);
    console.log(managers);
    console.log(manager);
    console.log(league);
    console.log(vidiprinter);
  };

  return (
    <div className="logout-container">
      <button className="login-button" onClick={handleClick}>
        Log Data
      </button>
    </div>
  );
};

export default TestComponent;
