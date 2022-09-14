import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./Landing";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./LoginPage";
import LoadingSpinner from "./LoadingSpinner";
import { LoadingContext } from "./Store";
import MyTeamPage from "./MyTeamPage";
import LeagueTablePage from "./LeagueTablePage";
import FixturesPage from "./FixturesPage";
import SquadsPage from "./SquadsPage";
import PlayersPage from "./PlayersPage/PlayersPage";
import RulesPage from "./RulesPage";
import FixtureScores from "./FixtureScores";
import DraftPage from "./TheDraftPage/DraftPage";
import FinalsPage from "./FinalsPage";
import AdminLanding from "./Admin/Landing";
import AdminFixtures from "./Admin/Fixtures";
import AdminManagers from "./Admin/Managers";
import AdminPlayers from "./Admin/Players";
import AdminTeams from "./Admin/Teams";
import AdminLeague from "./Admin/League";
import AdminAllLeagues from "./Admin/AllLeagues";
import AdminFixtureScores from "./Admin/FixtureScores";
import CountdownTimer from  "./TheDraftPage/CountdownTimer";
import LogoutButton from "./LogOut";
import SemiShortlistPage from "./SemiShortlistPage/SemiShortlistPage";
import FinalShortlistPage from "./FinalShortlistPage/FinalShortlistPage";
import ShortlistPage from "./ShortlistPage/ShortlistPage";

export default function BrowserRouter() {
  const { isLoading, user, isAuthenticated } = useAuth0();

  const [isLoadingData] = useContext(LoadingContext);

  if (!isAuthenticated && !isLoading) {
    return (
      <Router>
        <div className="main-body">
          <LoginPage />
        </div>
      </Router>
    );
  }

  if (isLoading || isLoadingData) {
    return (
      <div className="main-body">
        <LoadingSpinner loading={user} />
        {/* <LogoutButton /> */}
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="main-body">
            <Landing />
          </div>
        </Route>
        <Route exact path="/shortlist">
          <div className="main-body">
            <ShortlistPage />
          </div>
        </Route>
        <Route exact path="/my-team">
          <div className="main-body">
            <MyTeamPage />
          </div>
        </Route>
        <Route exact path="/league-table">
          <div className="main-body">
            <LeagueTablePage />
          </div>
        </Route>
        <Route exact path="/fixtures">
          <div className="main-body">
            <FixturesPage />
          </div>
        </Route>
        <Route exact path="/squads">
          <div className="main-body">
            <SquadsPage />
          </div>
        </Route>
        <Route exact path="/players">
          <div className="main-body">
            <PlayersPage />
          </div>
        </Route>
        <Route exact path="/rules">
          <div className="main-body">
            <RulesPage />
          </div>
        </Route>
        <Route exact path="/draft">
          <div className="main-body">
            <DraftPage />
          </div>
        </Route>
        <Route exact path="/fixtures/:fixtureId">
          <div className="main-body">
            <FixtureScores />
          </div>
        </Route>
        <Route exact path="/finals">
          <div className="main-body">
            <FinalsPage />
          </div>
        </Route>
        <Route exact path="/semi-shortlist">
          <div className="main-body">
           <SemiShortlistPage />
          </div>
        </Route>
        <Route exact path="/final-shortlist">
          <div className="main-body">
           <FinalShortlistPage />
          </div>
        </Route>
        <Route exact path="/test-component">
          <div className="main-body">
            <CountdownTimer />
          </div>
        </Route>
        <Route exact path="/admin">
          <div className="admin-body">
            <AdminLanding />
          </div>
        </Route>
        <Route exact path="/admin/fixtures">
          <div className="admin-body">
            <AdminFixtures />
          </div>
        </Route>
        <Route exact path="/admin/managers">
          <div className="admin-body">
            <AdminManagers />
          </div>
        </Route>
        <Route exact path="/admin/players">
          <div className="admin-body">
            <AdminPlayers />
          </div>
        </Route>
        <Route exact path="/admin/teams">
          <div className="admin-body">
            <AdminTeams />
          </div>
        </Route>
        <Route exact path="/admin/league">
          <div className="admin-body">
            <AdminLeague />
          </div>
        </Route>
        <Route exact path="/admin/all-leagues">
          <div className="admin-body">
            <AdminAllLeagues />
          </div>
        </Route>
        <Route path="/admin/fixture/:fixtureId">
          <div className="admin-body">
            <AdminFixtureScores />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
