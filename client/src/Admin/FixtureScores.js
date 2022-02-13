import React, { useContext, useState, useEffect, useRef } from 'react';
import Header from './Header';
import { useParams } from "react-router-dom";
import { FixturesContext } from "../Store";
import Helpers from './utils/Helpers';
import LoadingSpinner from './LoadingSpinner';
import TeamScores from './TeamScores';

export default function FixtureScores() {

  const [fixtures] = useContext(FixturesContext);
  const [fixture, setFixture] = useState();

  const { fixtureId } = useParams();

  const previousFixtures = usePrevious(fixtures);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!previousFixtures && fixtures) {
      setFixture(Helpers.getObjectById(fixtures, fixtureId));
    }
  });

  if (!fixtures || !fixture) {
    return (
      <LoadingSpinner loading={true}/>
    );
  }

  return (
    <>
    <Header />
      <TeamScores fixtureId={fixture.id} teamId={fixture.homeTeamId}/>
      <TeamScores fixtureId={fixture.id} teamId={fixture.awayTeamId}/>
    </>
  );
}