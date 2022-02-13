import React from "react";

export default function NavIcon(props) {
  return (
    <div>
      <div className="icon-container">
        <img className="nav-panel-icon" src={props.icon} alt="the-euro-draft" />
      </div>
      <div className="icon-label">{props.label}</div>
    </div>
  );
}
