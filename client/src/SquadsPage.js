import React, { useContext, useEffect, useState } from "react";
import ComponentHeader from "./ComponentHeader";
import SquadDisplay from "./SquadDisplay";
import {
  ManagersContext,
  LeagueManagersContext,
  LeagueContext,
  PlayersContext,
} from "./Store";
import Helpers from "./utils/Helpers";
import Search from "./utils/search";
import ManagerProps from "./utils/ManagerProps";
const sortObjectsArray = require("sort-objects-array");

export default function SquadsPage() {
  const [managers, setManagers] = useContext(ManagersContext);
  const [players] = useContext(PlayersContext);
  const [leagueManagers, setLeagueManagers] = useContext(LeagueManagersContext);
  const [league] = useContext(LeagueContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getUpdatedManagers = async () => {
      setLoading(true);
      try {
        const managersData = await Search.getAllManagers();
        const playerData = await Search.getAllPlayers();
        ManagerProps.getManagerProperties(managersData, playerData);
        ManagerProps.getStagePoints(managersData, players);
        setLeagueManagers(Helpers.setManagersByLeague(league, managersData));
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };

    if (league.draft1Live) {
      getUpdatedManagers();
    } else {
      setLoading(false);
    }
  }, []);

  const dateNow = new Date().toISOString();

  const sortedManagers = sortObjectsArray(
    leagueManagers,
    "totalPoints",
    "desc"
  );
  const stage2Managers = sortObjectsArray(
    Helpers.getStage2Managers(league, leagueManagers),
    "totalPoints",
    "desc"
  );
  const stage3Managers = sortObjectsArray(
    Helpers.getStage3Managers(league, leagueManagers),
    "totalPoints",
    "desc"
  );

  return (
    <>
      <ComponentHeader from="squads" title="Squads" />
      {!loading && league.stage3Date && dateNow > league.stage3Date && (
        <>
          <div className="standard-width-container flex-container stage-heading">
            Final Squads
          </div>
          <div className="flex-container standard-width-container align-items-start space-evenly squads-container">
            {stage3Managers.map((manager) => (
              <SquadDisplay manager={manager} key={manager.id} stage={3} />
            ))}
          </div>
        </>
      )}
      {!loading && league.stage2Date && dateNow > league.stage2Date && (
        <>
          <div className="standard-width-container flex-container stage-heading">
            Semi Final Squads
          </div>
          <div className="flex-container standard-width-container align-items-start space-evenly squads-container">
            {stage2Managers.map((manager) => (
              <SquadDisplay manager={manager} key={manager.id} stage={2} />
            ))}
          </div>
        </>
      )}
      {!loading && league.stage2Date && dateNow > league.stage2Date && (
        <>
          <div className="standard-width-container flex-container stage-heading">
            League Squads
          </div>
        </>
      )}
      {!loading && (
        <div className="flex-container standard-width-container align-items-start space-evenly squads-container">
          {sortedManagers.map((manager) => (
            <SquadDisplay manager={manager} key={manager.id} stage={1} />
          ))}
        </div>
      )}
    </>
  );
}
