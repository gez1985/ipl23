import React from "react";
import fixtures from "./img/Fixtures.png";
import leagueTable from "./img/LeagueTable.png";
import myTeam from "./img/MyTeam.png";
import players from "./img/Players2.png";
import rules from "./img/Rules.png";
import squads from "./img/Squads.png";
import NavIcon from "./NavIcon";
import { Link } from "react-router-dom";

export default function NavPanel() {
  
  return (
    <>
      <div className="flex-container nav-panel">
        <Link to="/my-team" className="no-underline">
          <NavIcon icon={myTeam} label={"My Team"} />
        </Link>
        <Link to="/league-table" className="no-underline">
          <NavIcon icon={leagueTable} label={"League Table"} />
        </Link>
        <Link to="/fixtures" className="no-underline">
          <NavIcon icon={fixtures} label={"Fixtures"} />
        </Link>
        <Link to="/squads" className="no-underline">
          <NavIcon icon={squads} label={"Squads"} />
        </Link>
        <Link to="/players" className="no-underline">
          <NavIcon icon={players} label={"Players"} />
        </Link>
        <Link to="/rules" className="no-underline">
          <NavIcon icon={rules} label={"Rules"} />
        </Link>
      </div>
    </>
  );
}
