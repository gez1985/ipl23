import React from "react";
import NavIcon from "./NavIcon";
import finals from "./img/Finals.png";
import { Link } from "react-router-dom";

export default function FinalsIcon() {
  return (
    <div className="nav-panel">
      <Link to="/finals" className="no-underline">
        <NavIcon icon={finals} label={"The Finals"} />
      </Link>
    </div>
  );
}
