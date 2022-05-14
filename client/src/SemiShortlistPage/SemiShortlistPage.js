import React, { useEffect } from "react";
import AvailablePlayers from "./AvailablePlayers";
import MyPlayers from "./MyPlayers";
import MyShortlist from "./MyShortlist";
import SemiShortlistHeaders from "./SemiShortlistHeaders";

export default function SemiShortlistPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SemiShortlistHeaders />
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
