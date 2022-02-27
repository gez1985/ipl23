import React from "react";
import ComponentNav from "./ComponentNav";
import FixtureScoresHeaders from "./FixtureScoresHeaders";
import LeagueTableHeaders from "./LeagueTableHeaders";
import MobileComponentNav from "./MobileComponentNav";
import MyTeamHeaders from "./MyTeamHeaders";
import PageTitle from "./PageTitle";
import PlayersHeaders from "./PlayersHeaders";
import DraftTableHeaders from "./TheDraftPage/DraftTableHeaders";

export default function ComponentHeader(props) {
  return (
    <>
      <div className="component-header">
        <ComponentNav />
        <MobileComponentNav />
        <PageTitle title={props.title} from={props.from} />
        {props.from === "myTeam" && <MyTeamHeaders />}
        {props.from === "leagueTable" && <LeagueTableHeaders />}
        {props.from === "players" && <PlayersHeaders />}
        {props.from === "fixture-score" && <FixtureScoresHeaders />}
        {props.from === "draft" && <DraftTableHeaders />}
      </div>
    </>
  );
}
