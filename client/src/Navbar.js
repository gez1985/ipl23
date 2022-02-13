import React from "react";
import LogoutButton from "./LogOut";

export default function NavBar() {
  return (
    <div className=" flex-container space-between navbar-container">
      <div className="navbar-title">
        The Cricket Draft
      </div>
      <LogoutButton />
    </div>
  );
}
