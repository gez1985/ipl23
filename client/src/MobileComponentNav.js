import React, { useContext } from "react";
import { Link } from "react-router-dom";
import fixtures from "./img/Fixtures.png";
import leagueTable from "./img/LeagueTable.png";
import myTeam from "./img/MyTeam.png";
import players from "./img/Players2.png";
import squads from "./img/Squads.png";
import home from "./img/Home.png";
import draft from "./img/Draft.png";
import finals from "./img/Finals.png";
import { LeagueContext } from "./Store";

export default function MobileComponentNav() {
  const [league] = useContext(LeagueContext);

  const dateNow = new Date().toISOString();

  return (
    <>
      <div className="flex-container disappear-desktop">
        <div className="component-nav-container">
          <div className="flex-container mobile-nav-icon">
            <Link to="/">
              <img className="component-nav-icon" src={home} alt="home" />
            </Link>
          </div>
          <div className="mobile-nav-icon flex-container">
            {league.draft1Live ? (
              <Link to="/draft">
                <img className="component-nav-icon" src={draft} alt="draft" />
              </Link>
            ) : (
              <Link to="/my-team">
                <img
                  className="component-nav-icon"
                  src={myTeam}
                  alt="my-team"
                />
              </Link>
            )}
          </div>
          <div className="mobile-nav-icon flex-container">
            {dateNow > league.stage2Date ? (
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
          </div>
          <div className="mobile-nav-icon flex-container">
            <Link to="/fixtures">
              <img
                className="component-nav-icon"
                src={fixtures}
                alt="fixtures"
              />
            </Link>
          </div>
          <div className="mobile-nav-icon flex-container">
            <Link to="/squads">
              <img className="component-nav-icon" src={squads} alt="squads" />
            </Link>
          </div>
          <div className="mobile-nav-icon flex-container">
            <Link to="/players">
              <img className="component-nav-icon" src={players} alt="players" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
