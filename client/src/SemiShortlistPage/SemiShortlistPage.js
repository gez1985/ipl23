import React, { useState, useEffect } from "react";
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
      <Players handleShortlistClick={handleShortlistClick} />
    </>
  );
}
