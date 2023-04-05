import React from "react";
import NavIcon from "./NavIcon";
import TransfersIcon from "./img/TransfersIcon.png";
import { Link } from "react-router-dom";

export default function TransferPageIcon({ label, link }) {
  return (
    <div className="nav-panel">
      <Link to={link} className="no-underline">
        <NavIcon icon={TransfersIcon} label={label} />
      </Link>
    </div>
  );
}
