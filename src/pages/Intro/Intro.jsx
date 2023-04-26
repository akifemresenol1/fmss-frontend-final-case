import React from "react";
import logo from "../../assets/sw-logo.png";
import { useNavigate } from "react-router-dom";
import "./Intro.css";
import audio from "../../assets/sw-audio.mp3";
import Speaker from "./components/Audio";

function Intro() {
  const navigate = useNavigate();
  return (
    <div className="intro">
      <img className="logo" src={logo} alt="logo" />
      <Speaker src={audio} controls autoplay />
      <button
        className="explore-button"
        onClick={() => {
          navigate("/starships");
        }}
      >
        EXPLORE STARSHIPS
      </button>
    </div>
  );
}

export default Intro;
