import React from "react";
import NavIcon from "./NavIcon";
import shortlistIcon from "./img/Select.png";
import { Link } from "react-router-dom";

export default function StageShortlistIcon({ label, link }) {
  return (
    <div className="nav-panel">
      <Link to={link} className="no-underline">
        <NavIcon icon={shortlistIcon} label={label} />
      </Link>
    </div>
  );
}
