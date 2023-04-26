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
          <img src={logo404} alt="" />
          <button onClick={() => navigate("/")}>RETURN TO BASE</button>
        </div>
      )}
    </>
  );
}

export default Error;
