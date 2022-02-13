import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logOut from "./img/LogOut.png";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <>
        <img
          className="logout-icon"
          src={logOut}
          alt="the-euro-draft"
          onClick={() => logout({ returnTo: window.location.origin })}
        />
    </>
  );
};

export default LogoutButton;
