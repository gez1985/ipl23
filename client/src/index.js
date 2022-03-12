import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import "./index.css";
import App from "./App";
import Store from "./Store";
import { Auth0Provider } from "@auth0/auth0-react";
import BrowserRouter from "./BrowserRouter";

ReactDOM.render(
  <Auth0Provider
    domain="dev-euzk-z0t.eu.auth0.com"
    clientId="4sKG6M8kxdFZMiK0NBrpUSzoQ3UX2ctC"
    redirectUri={window.location.origin}
  >
    <Store>
      <React.StrictMode>
        <App />
        <BrowserRouter />
      </React.StrictMode>
    </Store>
  </Auth0Provider>,
  document.getElementById("root")
);
