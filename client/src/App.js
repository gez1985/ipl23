import { useContext, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./utils/search";
import Helpers from "./utils/Helpers";
import {
  FixturesContext,
  LeagueContext,
  ManagerContext,
  ManagersContext,
  PlayersContext,
  ScoresContext,
  TeamsContext,
  LoadingContext,
  LeaguesContext,
} from "./Store";
import Scores from "./utils/Scores";
import ManagerProps from "./utils/ManagerProps";

function App() {
  const { user, isAuthenticated } = useAuth0();

  const [, setIsLoadingData] = useContext(LoadingContext);
  const [managers, setManagers] = useContext(ManagersContext);
  const [manager, setManager] = useContext(ManagerContext);
  const [league, setLeague] = useContext(LeagueContext);
  const [players, setPlayers] = useContext(PlayersContext);
  const [scores, setScores] = useContext(ScoresContext);
  const [fixtures, setFixtures] = useContext(FixturesContext);
  const [teams, setTeams] = useContext(TeamsContext);
  const [leagues, setLeagues] = useContext(LeaguesContext);

  const previousIsAuthenticated = usePrevious(isAuthenticated);
  const previousManagers = usePrevious(managers);
  const previousManager = usePrevious(manager);
  const previousLeague = usePrevious(league);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    if (!previousIsAuthenticated && isAuthenticated) {
      getData();
    }
  });

  useEffect(() => {
    if (!previousManagers && managers) {
      setManager(Helpers.setManager(managers, user.sub));
    }
  });

  useEffect(() => {
    if (!previousManager && manager) {
      setLeague(Helpers.setLeague(leagues, manager.id));
    }
  });

  useEffect(() => {
    if (!previousLeague && league) {
      Scores.getStagePoints(players, scores, fixtures, league);
      ManagerProps.getStagePoints(managers, players);
      setManagers(Helpers.setManagersByLeague(league, managers));
      setIsLoadingData(false);
      console.log(players);
      console.log(teams);
      console.log(managers);
      console.log(fixtures);
      console.log(scores);
      console.log(manager);
      console.log(leagues);
      console.log(league);
    }
  });

  async function getData() {
    try {
      const scoresData = await Search.getAllScores();
      const playerData = await Search.getAllPlayers();
      const managersData = await Search.getAllManagers();
      const fixturesData = await Search.getAllFixtures();
      const teamsData = await Search.getAllTeams();
      const leaguesData = await Search.getAllLeagues();
      Scores.getPlayerScores(playerData, scoresData, teamsData);
      ManagerProps.getManagerProperties(managersData, playerData);
      setLeagues(leaguesData);
      setScores(scoresData);
      setPlayers(playerData);
      setFixtures(fixturesData);
      setTeams(teamsData);
      setManagers(managersData);
    } catch (err) {
      console.error(err.message);
    }
  }
  return null;
}

export default App;
