import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fixtures from "./img/Fixtures.png";
import leagueTable from "./img/LeagueTable.png";
import myTeam from "./img/MyTeam.png";
import players from "./img/Players2.png";
import rules from "./img/Rules.png";
import squads from "./img/Squads.png";
import draft from "./img/Draft.png";
import home from "./img/Home.png";
import finals from "./img/Finals.png";
import { LeagueContext } from "./Store";

export default function ComponentNav() {
  const [league] = useContext(LeagueContext);
  const [showDraft, setShowDraft] = useState(false);

  const dateNow = new Date().toISOString();

  useEffect(() => {
    if (league.draft1Live) {
      setShowDraft(true);
    }
  }, [league]);

  return (
    <>
      <div className="flex-container disappear-mobile">
        <div className="component-nav-container">
          <Link to="/">
            <img className="component-nav-icon" src={home} alt="home" />
          </Link>
          {showDraft && (
            <Link to="/draft">
              <img className="component-nav-icon" src={draft} alt="draft" />
            </Link>
          )}
          <Link to="/my-team">
            <img className="component-nav-icon" src={myTeam} alt="my-team" />
          </Link>
          {league.stage2Date && dateNow > league.stage2Date ? (
            <Link to="/finals">
              <img
                className="component-nav-icon"
                src={finals}
                alt="The-Finals"
              />
            </Link>
          ) : (
            <Link to="/league-table">
              <img
                className="component-nav-icon"
                src={leagueTable}
                alt="league-table"
              />
            </Link>
          )}

          <Link to="/fixtures">
            <img className="component-nav-icon" src={fixtures} alt="fixtures" />
          </Link>
          <Link to="/squads">
            <img className="component-nav-icon" src={squads} alt="squads" />
          </Link>
          <Link to="/players">
            <img className="component-nav-icon" src={players} alt="players" />
          </Link>
          <Link to="/rules">
            <img className="component-nav-icon" src={rules} alt="rules" />
          </Link>
        </div>
      </div>
    </>
  );
}
