import React, { useEffect, useContext } from "react";
import Logo from "./Logo";
import NavBar from "./Navbar";
import NavPanel from "./NavPanel";
import DraftNavIcon from "./TheDraftPage/DraftNavIcon";
import FinalsIcon from "./FinalsIcon";
import { LeagueContext } from "./Store";
import Champions from "./ChampionsComponent/Champions";

export default function Landing() {
  const [league] = useContext(LeagueContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dateNow = new Date().toISOString();

  return (
    <>
      <NavBar />
      <div className="flex-container standard-width-container">
        <Logo />
      </div>
      <div className="flex-container">
        {(league.draft1Live || league.draft2Live || league.draft3Live) && (
          <DraftNavIcon />
        )}
        {dateNow > league.stage2Date && <FinalsIcon />}
      </div>
      <NavPanel />
      <Champions />
    </>
  );
}
