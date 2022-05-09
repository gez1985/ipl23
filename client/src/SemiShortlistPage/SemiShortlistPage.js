import React, { useState, useEffect } from "react";
import MyPlayers from "./MyPlayers";
import Players from "./Players";
import SemiShortlistHeaders from "./SemiShortlistHeaders";

export default function SemiShortlistPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShortlistClick = () => {
    console.log("short list clicked");
  };

  return (
    <>
      <SemiShortlistHeaders />
      <div className="standard-width-container">
        <div className="ss-main-container">
          <MyPlayers />
          <div className="ss-my-shortlist"></div>
        </div>
      </div>

      {/* <Players handleShortlistClick={handleShortlistClick} /> */}
    </>
  );
}
