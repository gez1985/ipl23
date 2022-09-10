import React, { useContext, useEffect } from "react";
import ComponentHeader from "./ComponentHeader";
import SquadDisplay from "./SquadDisplay";
import { LeagueManagersContext as ManagersContext, LeagueContext } from "./Store";
import Helpers from "./utils/Helpers";
const sortObjectsArray = require("sort-objects-array");

export default function SquadsPage() {
  const [managers] = useContext(ManagersContext);
  const [league] = useContext(LeagueContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dateNow = new Date().toISOString();

  const sortedManagers = sortObjectsArray(managers, "totalPoints", "desc");
  const stage2Managers = sortObjectsArray(
    Helpers.getStage2Managers(league, managers),
    "totalPoints",
    "desc"
  );
  const stage3Managers = sortObjectsArray(
    Helpers.getStage3Managers(league, managers),
    "totalPoints",
    "desc"
  );

  return (
    <>
      <ComponentHeader from="squads" title="Squads" />
      {league.stage3Date && dateNow > league.stage3Date && (
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
      {league.stage2Date && dateNow > league.stage2Date && (
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
      {league.stage2Date&& dateNow > league.stage2Date && (
        <>
          <div className="standard-width-container flex-container stage-heading">
            League Squads
          </div>
        </>
      )}
      <div className="flex-container standard-width-container align-items-start space-evenly squads-container">
        {sortedManagers.map((manager) => (
          <SquadDisplay manager={manager} key={manager.id} stage={1} />
        ))}
      </div>
    </>
  );
}
