import React, { useContext, useEffect } from "react";
import LogData from "./LogDataButton";
import { Link } from "react-router-dom";
import LogoutButton from "./LogOut";
import Header from "./Header";
import { ManagerContext, LeagueContext } from "../Store";
import Vidiprinter from "./Vidiprinter";

export default function AdminLanding() {
  const [manager] = useContext(ManagerContext);
  const [league] = useContext(LeagueContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (manager.adminLevel === 1) {
    if (league.adminManagerId === manager.id) {
      return (
        <>
          <Header />
          <div className="nav-link-container">
            <Link to="/admin/league">
              <p>League</p>
            </Link>
            <Link to="/admin/managers">
              <p>Managers</p>
            </Link>
          </div>
          <LogoutButton />
          <Vidiprinter />
        </>
      );
    }
    return null;
  }

  if (manager.adminLevel === 2) {
    return (
      <>
        <Header />
        <div className="nav-link-container">
          <Link to="/admin/fixtures">
            <button>Fixtures</button>
          </Link>
          {league.adminManagerId === manager.id && (
            <>
              <Link to="/admin/league">
                <button>League</button>
              </Link>
              <Link to="/admin/managers">
                <button>Managers</button>
              </Link>
              <Vidiprinter />
            </>
          )}
        </div>
        <LogoutButton />
      </>
    );
  }

  if (manager.adminLevel === 3) {
    return (
      <>
        <Header />
        <div className="nav-link-container">
          <Link to="/admin/fixtures">
            <button>Fixtures</button>
          </Link>
          <Link to="/admin/players">
            <button>Players</button>
          </Link>
          <Link to="/admin/teams">
            <button>Teams</button>
          </Link>
          {league.adminManagerId === manager.id && (
            <>
              <Link to="/admin/league">
                <button>League</button>
              </Link>
              <Link to="/admin/managers">
                <button>Managers</button>
              </Link>
              <Vidiprinter />
            </>
          )}
        </div>
        <LogoutButton />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="announcement">* Mobile devices are best used in wide screen *</div>
      <div className="nav-link-container">
        <Link to="/admin/fixtures">
          <button>Fixtures</button>
        </Link>
        <Link to="/admin/managers">
          <button>Managers</button>
        </Link>
        <Link to="/admin/players">
          <button>Players</button>
        </Link>
        <Link to="/admin/teams">
          <button>Teams</button>
        </Link>
        <Link to="/admin/league">
          <button>League</button>
        </Link>
        <Link to="/admin/all-leagues">
          <button>All Leagues</button>
        </Link>
      </div>
      <Vidiprinter />
      <LogoutButton />
      <LogData />
    </>
  );
}
