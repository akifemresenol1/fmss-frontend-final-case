import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Error404.css";
import logo404 from "../../assets/sw-404.png";
import LoadingScreen from "../../components/Loading";

function Error() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="error">
          <div className="error-title">
            <h1>
              4<img src={logo404} alt="" />4
            </h1>
            <h2>YOU LOST YOUR OWN WAY MY SON</h2>
          </div>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      )}
    </>
  );
}

export default Error;
