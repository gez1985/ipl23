import React, { useEffect } from "react";
import PlayersPageHeaders from "./PlayersPageHeaders";
import Players from "./Players";

export default function PlayersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PlayersPageHeaders />
      <Players />
    </>
  );
}
