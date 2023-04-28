import React from "react";

import logo from "../../assets/sw-logo.png";
import "./Header.css";

function Header() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
    </div>
  );
}
export default Header;
