import { useContext } from "react";
import Search from "../../utils/search";
import ManagerProps from "../../utils/ManagerProps";
import {
  LeagueContext,
  LeagueManagersContext as ManagersContext,
  PlayersContext,
  VidiprinterContext,
} from "../../Store";
import Helpers from "../../utils/Helpers";

const useGetDraftData = async () => {
  const [players] = useContext(PlayersContext);
  const [, setManagers] = useContext(ManagersContext);
  const [league, setLeague] = useContext(LeagueContext);
  const [, setVidiprinter] = useContext(VidiprinterContext);

  const managersData = await Search.getAllManagers();
  const leagueData = await Search.getLeagueById(league.id);
  const vidiprinterData = await Search.getVidiprinterById(league.id);
  vidiprinterData.reverse();
  ManagerProps.getManagerProperties(managersData, players);
  setManagers(Helpers.setManagersByLeague(league, managersData));
  setLeague(leagueData[0]);
  setVidiprinter(vidiprinterData);
  console.log(`Got Data`);
};

export default useGetDraftData;
