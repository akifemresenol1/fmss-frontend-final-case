import React, { useState, useEffect } from "react";
import "./StarshipDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../../components/Loading";
import { REACT_APP_API_BASE_URL } from "../../api/starships";
import getStarshipId from "../../utils/getStarshipId";

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
      <h2>{starship.name}</h2>
      <p>Model: {starship.model}</p>
      <p>Hiperdrive Raiting: {starship.hyperdrive_rating}</p>
      <hr />
      <div>{imgUrl && <img src={imgUrl} alt="img" />}</div>
      <p>Passengers: {starship.passengers}</p>
      <p>Max Atmosphering Speed: {starship.max_atmosphering_speed}</p>
      <p>Manufacturer: {starship.manufacturer}</p>
      <p>Crew: {starship.crew}</p>
      <p>Cargo Capacity: {starship.cargo_capacity}</p>
      <button
        className="btn-backStarship"
        onClick={() => navigate("/starships")}
      >
        Back to Starships
      </button>
    </div>
  );
}
