import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FixturesContext, TeamsContext } from "./Store";
import Helpers from "./utils/Helpers";
import ComponentHeader from "./ComponentHeader";
import TeamScores from "./TeamScores";

export default function FixtureScores() {
  const [fixtures] = useContext(FixturesContext);
  const [teams] = useContext(TeamsContext);

  const { fixtureId } = useParams();

  const fixture = Helpers.getObjectById(fixtures, fixtureId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ComponentHeader
        title={`${Helpers.getNameById(
          teams,
          fixture.homeTeamId
        )} v ${Helpers.getNameById(teams, fixture.awayTeamId)}`}
        from="fixture-score"
      />
      <div className="standard-width-container">
        <TeamScores fixtureId={fixture.id} teamId={fixture.homeTeamId} home={true}/>
        <TeamScores fixtureId={fixture.id} teamId={fixture.awayTeamId} />
      </div>
    </>
  );
}
