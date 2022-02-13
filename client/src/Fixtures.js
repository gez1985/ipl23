import React, { useContext } from "react";
import { TeamsContext } from "./Store";
import Moment from "react-moment";
import Helpers from "./utils/Helpers";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Fixtures(props) {
  const [teams] = useContext(TeamsContext);

  const dateNow = moment().format();

  function getFixtureContents(fixture) {
    return (
      <div key={fixture.id}>
        <div className="fixture-container">
          <div className="fixture-team-left">
            {Helpers.getNameById(teams, fixture.homeTeamId)}
          </div>
          <Moment className="fixture-time" format="HH:mm">
            {fixture.date}
          </Moment>
          <div className="fixture-team-right">
            {Helpers.getNameById(teams, fixture.awayTeamId)}
          </div>
        </div>
      </div>
    );
  }

  function renderFixture(fixture) {
    if (dateNow > fixture.date) {
      return (
        <div key={fixture.id}>
          <Link to={`/fixtures/${fixture.id}`} className="fixture-link">
            {getFixtureContents(fixture)}
          </Link>
        </div>
      );
    } else {
      return <>{getFixtureContents(fixture)}</>;
    }
  }

  return (
    <>
      <div className="fixture-render">
        <Moment className="fixture-date" format="ddd D MMM:">
          {props.date}
        </Moment>
        {props.fixtures.map((fixture) => renderFixture(fixture))}
      </div>
    </>
  );
}
