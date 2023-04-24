import React from "react";
import LoadingGif from "../../assets/gifloading.gif";
import "./Loading.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img src={LoadingGif} alt="loading.." />
    </div>
  );
};

export default LoadingScreen;
