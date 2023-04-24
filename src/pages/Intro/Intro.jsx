import React from "react";
import logo from "../../assets/sw-logo.png";
import { useNavigate } from "react-router-dom";
import "./Intro.css";

function Intro() {
  const navigate = useNavigate();
  return (
    <div className="intro">
      <img className="logo" src={logo} alt="logo" />
      <button
        onClick={() => {
          navigate("/starships");
        }}
        className="explore-button"
      >
        EXPLORE STARSHIPS
      </button>
    </div>
  );
}

export default Intro;
