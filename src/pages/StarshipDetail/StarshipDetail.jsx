import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getStarshipDetail } from "../../api/starships";
import LoadingScreen from "../../components/Loading";
import backImg from "../../assets/goBack.png";
import "./StarshipDetail.css";

export default function StarshipDetail() {
  const [starship, setStarship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStarshipDetail = async () => {
      try {
        const response = await getStarshipDetail(id);
        setStarship(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        navigate("/error");
      }
    };
    fetchStarshipDetail();
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
          <img
            src={`https://ik.imagekit.io/akifemresenol/starships/${id}.png`}
            alt="img"
          />
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
        <button className="btn-backStarship" onClick={() => navigate(-1)}>
          <img src={backImg} alt="go back" />
        </button>
      </div>
    </div>
  );
}
