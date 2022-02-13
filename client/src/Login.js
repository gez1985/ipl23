import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import login from "./img/Login.png";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <img
      onClick={() => loginWithRedirect()}
      className="login-icon cursor-pointer"
      src={login}
      alt="Login"
    />
  );
};

export default LoginButton;
