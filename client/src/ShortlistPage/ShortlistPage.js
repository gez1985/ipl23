import React, { useEffect, useContext } from "react";
import Players from "./Players";
import Shortlist from "./Shortlist";
import ShortlistPageHeader from "./ShortlistPageHeaders";
import { LeagueContext } from "../Store";

const ShortlistPage = () => {
  const [league] = useContext(LeagueContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ShortlistPageHeader />
      <div className="standard-width-container">
        <div className="shortlist-main-container">
          {league.draft1Live && (
            <div>Shortlist is unavailable during the draft.</div>
          )}
          {!league.draft1Live && (
            <>
              <Players />
              <Shortlist />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortlistPage;
