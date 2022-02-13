import React from "react";
import MyTeam from "./MyTeam";
import ComponentHeader from "./ComponentHeader";

export default function MyTeamPage() {
  return (
    <>
      <ComponentHeader from="myTeam" title="My Team"/>
      <MyTeam />
    </>
  );
}
