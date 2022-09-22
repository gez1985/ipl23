import React, { useEffect, useContext } from "react";
import Logo from "./Logo";
import NavBar from "./Navbar";
import NavPanel from "./NavPanel";
import DraftNavIcon from "./TheDraftPage/DraftNavIcon";
import FinalsIcon from "./FinalsIcon";
import { LeagueContext, ManagerContext } from "./Store";
import Champions from "./ChampionsComponent/Champions";
import StageShortlistIcon from "./StageShortlistIcon";

export default function Landing() {
  const [league] = useContext(LeagueContext);
  const [manager] = useContext(ManagerContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dateNow = new Date().toISOString();
  const stage2Managers = league.stage2Managers.flat();
  const stage3Managers = league.stage3Managers.flat();

  return (
    <div className="landing-page-container">
      <NavBar />
      <div className="flex-container standard-width-container">
        <Logo />
      </div>
      <div className="flex-container">
        {dateNow < league.draftDate && (
          <StageShortlistIcon
            label="My Shortlist"
            link="/shortlist"
          />
        )}
        {league.draft1Live && <DraftNavIcon />}
        {stage2Managers.includes(manager.id) &&
          manager.stage2Squad.length < 13 && (
            <StageShortlistIcon
              label="My Semi Shortlist"
              link="/semi-shortlist"
            />
          )}
        {stage3Managers.includes(manager.id) &&
          manager.stage3Squad.length < 13 && (
            <StageShortlistIcon
              label="My Final Shortlist"
              link="/final-shortlist"
            />
          )}
        {league.stage2Date && dateNow > league.stage2Date && <FinalsIcon />}
      </div>
      <NavPanel />
      <Champions />
    </div>
  );
}
