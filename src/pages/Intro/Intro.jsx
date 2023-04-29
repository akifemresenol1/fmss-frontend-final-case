import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/sw-logo.png";
import audio from "../../assets/sw-audio.mp3";
import Speaker from "./components/Audio";
import "./Intro.css";

function Intro() {
  const navigate = useNavigate();
  return (
    <div className="intro">
      <img className="logo-intro" src={logo} alt="logo" />

      <div className="scroller">
        <div id="intro-content">
          <h2 className="title"> It is a dark time for the Rebellion. </h2>
          <p>Although the Death Star has been </p>
          <p>destroyed,</p>
          <p>Imperial troops have driven the Rebel</p>
          <p>forces from their hidden base</p>
          <p>and pursued them across the galaxy.</p>
          <p>Evading the dreaded Imperial Starfleet, </p>
          <p>a group of freedom fighters led by </p>
          <p>Luke Skywalker</p>
          <p>has established a new secret base on the</p>
          <p>remote ice world of Hoth.</p>
          <p>The evil lord Darth Vader,</p>
          <p> obsessed with finding young Skywalker,</p>
          <p>has dispatched thousands of remote</p>
          <p>probes into the far reaches of space..</p>
        </div>
      </div>
      <div className="header">
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
    </div>
  );
}

export default Intro;
