import React, { useEffect } from "react";
import Players from "./Players";
import Shortlist from "./Shortlist";
import ShortlistPageHeader from "./ShortlistPageHeaders";

const ShortlistPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ShortlistPageHeader />
      <div className="standard-width-container">
        <div className="shortlist-main-container">
          <Players />
          <Shortlist />
        </div>
      </div>
    </div>
  );
};

export default ShortlistPage;
