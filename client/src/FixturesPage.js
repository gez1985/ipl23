import React, { useContext, useEffect } from "react";
import ComponentHeader from "./ComponentHeader";
import Fixtures from "./Fixtures";
import { FixturesContext } from "./Store";
const sortObjectsArray = require("sort-objects-array");

export default function FixturesPage() {
  const [fixtures] = useContext(FixturesContext);

  const sortedFixtures = sortObjectsArray(fixtures, "date");

  const fixturesByDate = [];

  const allDates = [];

  const dates = sortedFixtures.map((fixture) => fixture.date);
  dates.forEach((date) => {
    const thisDate = new Date(date);
    const dateString = thisDate.toDateString();
    allDates.push(dateString);
  });
  const uniqueDates = [...new Set(allDates)];

  uniqueDates.forEach((date) => {
    fixturesByDate.push({ date: date, fixtures: [] });
  });

  sortedFixtures.forEach((fixture) => {
    const thisDate = new Date(fixture.date);
    const dateString = thisDate.toDateString();
    const fixtureByDate = fixturesByDate.find(
      (fixture) => fixture.date === dateString
    );
    fixtureByDate.fixtures.push(fixture);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ComponentHeader from="fixtures" title="Fixtures" />
      <div className="standard-width-container">
        {fixturesByDate.map((fixtures) => (
          <Fixtures
            key={fixtures.date}
            date={fixtures.date}
            fixtures={fixtures.fixtures}
          />
        ))}
      </div>
    </>
  );
}
