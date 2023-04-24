import React from "react";
import "./Header.css";
import logo from "../../assets/sw-logo.png";

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
