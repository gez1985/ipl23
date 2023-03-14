import React, { useContext, useEffect } from "react";
import ComponentHeader from "./ComponentHeader";
import MatchScore from "./MatchScore";
import {
  LeagueContext,
  LeagueManagersContext as ManagersContext,
} from "./Store";
import Helpers from "./utils/Helpers";
import SquadDisplay from "./SquadDisplay";
import LeagueTable from "./LeagueTable";
import styled from "styled-components";

export default function FinalsPage() {
  const [league] = useContext(LeagueContext);
  const [managers] = useContext(ManagersContext);

  const dateNow = new Date().toISOString();

  const semiManager1 = Helpers.getObjectById(
    managers,
    league.stage2Managers[0][0]
  );
  const semiManager2 = Helpers.getObjectById(
    managers,
    league.stage2Managers[0][1]
  );
  const semiManager3 = Helpers.getObjectById(
    managers,
    league.stage2Managers[1][0]
  );
  const semiManager4 = Helpers.getObjectById(
    managers,
    league.stage2Managers[1][1]
  );

  let finalManager1 = {};
  let finalManager2 = {};

  if (dateNow > league.stage3Date) {
    finalManager1 = Helpers.getObjectById(
      managers,
      league.stage3Managers[0][0]
    );
    finalManager2 = Helpers.getObjectById(
      managers,
      league.stage3Managers[0][1]
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ComponentHeader from="finals" title="The Finals" />
      <div className="standard-width-container">
        {dateNow > league.stage3Date ? (
          <>
            <div className="flex-container stage-heading">The Final</div>
            <MatchScore
              homeManager={finalManager1}
              awayManager={finalManager2}
              stage={3}
            />
            <div className="flex-container align-items-start space-evenly squads-container">
              <SquadDisplay manager={finalManager1} stage={3} />
              <SquadDisplay manager={finalManager2} stage={3} />
            </div>
          </>
        ) : null}
        <div className="flex-container stage-heading">The Semi-Finals</div>
        <MatchScore
          homeManager={semiManager1}
          awayManager={semiManager2}
          stage={2}
        />
        <MatchScore
          homeManager={semiManager3}
          awayManager={semiManager4}
          stage={2}
        />
        <div className="flex-container align-items-start space-evenly squads-container">
          <SquadDisplay manager={semiManager1} stage={2} />
          <SquadDisplay manager={semiManager2} stage={2} />
          <SquadDisplay manager={semiManager3} stage={2} />
          <SquadDisplay manager={semiManager4} stage={2} />
        </div>
        <div className="flex-container standard-width-container">
          <TableContainer>
            <TableHeader>
              <Title>League Table</Title>
            </TableHeader>
          </TableContainer>
        </div>
        <LeagueTable />
      </div>
    </>
  );
}

const TableContainer = styled.div`
  padding-top: 15px;
  width: 700px;
  margin: 20px 10px 0 10px;
  border-radius: 7px;
  @media screen and (max-width: 1024px) {
    margin: 0 0 10px 0;
  }
`;

const TableHeader = styled.div`
  background-color: #dd6d1f;
  color: white;
  text-align: left;
  padding: 7px;
  border-radius: 7px 7px 0 0;
`;

const Title = styled.div`
  font-family: "Oswald", sans-serif;
  font-size: 28px;
  font-weight: 400;
  text-transform: uppercase;
  @media screen and (max-width: 1024px) {
    font-size: 24px;
  }
`;
