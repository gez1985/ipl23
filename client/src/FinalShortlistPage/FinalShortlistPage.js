import React, { useEffect } from "react";
import AvailablePlayers from "./AvailablePlayers";
import MyPlayers from "./MyPlayers";
import MyShortlist from "./MyShortlist";
import FinalShortlistHeaders from "./FinalShortlistHeaders";

export default function FinalShortlistPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <FinalShortlistHeaders />
      <div className="standard-width-container">
        <div className="ss-main-container">
          <MyPlayers />
          <MyShortlist />
        </div>
        <AvailablePlayers />
      </div>
    </>
  );
}
