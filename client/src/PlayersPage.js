import React, { useEffect } from "react";
import ComponentHeader from "./ComponentHeader";
import Players from "./Players";

export default function PlayersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ComponentHeader from="players" title="Players" />
      <Players />
    </>
  );
}
