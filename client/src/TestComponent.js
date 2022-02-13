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
} from "./Store";

const TestComponent = () => {
  const [players] = useContext(PlayersContext);
  const [scores] = useContext(ScoresContext);
  const [fixtures] = useContext(FixturesContext);
  const [teams] = useContext(TeamsContext);
  const [managers] = useContext(ManagersContext);
  const [manager] = useContext(ManagerContext);
  const [league] = useContext(LeagueContext);
  const [vidi] = useContext(VidiprinterContext);

  const handleClick = () => {
    console.log(players);
    console.log(scores);
    console.log(fixtures);
    console.log(teams);
    console.log(managers);
    console.log(manager);
    console.log(league);
    console.log(vidi);
  };

  return (
    <>
      <button onClick={handleClick}>Log Data</button>
    </>
  );
};

export default TestComponent;
