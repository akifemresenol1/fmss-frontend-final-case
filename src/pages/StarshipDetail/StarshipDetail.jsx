import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import LoadingScreen from "../../components/Loading";
import { REACT_APP_API_BASE_URL } from "../../api/starships";
import getStarshipId from "../../utils/getStarshipId";
import backImg from "../../assets/goBack.png";
import "./StarshipDetail.css";

export default function StarshipDetail() {
  const [starship, setStarship] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const getId = starship ? getStarshipId(starship.url) : null;
  const imgUrl = getId
    ? `https://ik.imagekit.io/akifemresenol/starships/${getId}.png?updatedAt=1682374179359`
    : null;

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_BASE_URL}${id}`)
      .then((response) => {
        setStarship(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        navigate("/error");
      });
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="starship-detail">
      <div className="detail-card">
        <h2>{starship.name}</h2>
        <p className="model">Model: {starship.model}</p>
        <div className="ships-img">
          {imgUrl && <img src={imgUrl} alt="img" />}
        </div>
        <div className="features">
          <h3>Passengers: {starship.passengers}</h3>
          <h3>Max Atmosphering Speed: {starship.max_atmosphering_speed}</h3>
          <h3>Manufacturer: {starship.manufacturer}</h3>
          <h3>Crew: {starship.crew}</h3>
          <h3>Cargo Capacity: {starship.cargo_capacity}</h3>
        </div>{" "}
        <p className="rating-detail">
          Hiperdrive Raiting: {starship.hyperdrive_rating}
        </p>
        <button
          className="btn-backStarship"
          onClick={() => navigate("/starships")}
        >
          <img src={backImg} alt="go back" />
        </button>
      </div>
    </div>
  );
}
