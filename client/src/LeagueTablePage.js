import React from "react";
import ComponentHeader from "./ComponentHeader";
import LeagueTable from "./LeagueTable";

export default function LeagueTablePage() {
  return (
    <>
      <ComponentHeader from="leagueTable" title="League Table"/>
      <LeagueTable />
    </>
  );
}
