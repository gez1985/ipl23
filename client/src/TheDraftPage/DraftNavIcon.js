import React from "react";
import NavIcon from "../NavIcon";
import draft from "../img/Draft.png";
import { Link } from "react-router-dom";

export default function DraftNavIcon() {
  return (
    <div className="nav-panel">
      <Link to="/draft" className="no-underline">
        <NavIcon icon={draft} label={"The Draft"} />
      </Link>
    </div>
  );
}
