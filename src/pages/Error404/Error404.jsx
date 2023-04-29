import React from "react";
import { useNavigate } from "react-router-dom";

import logo404 from "../../assets/sw-404.png";
import "./Error404.css";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="error">
      <div className="error-wrapper">
        <img src={logo404} alt="" />
        <button className="btn-return" onClick={() => navigate("/")}>
          RETURN TO BASE
        </button>
      </div>
    </div>
  );
}

export default Error;
