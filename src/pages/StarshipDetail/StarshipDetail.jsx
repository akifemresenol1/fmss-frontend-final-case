import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getStarshipDetail } from "../../api/starships";
import LoadingScreen from "../../components/Loading";
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
        <div className="starship-content">
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
          </div>
        </div>
        <p className="rating-detail">
          Hiperdrive Raiting: {starship.hyperdrive_rating}
        </p>
        <button className="btn-backStarship" onClick={() => navigate(-1)}>
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 108.06"
            width={20}
            height={20}
          >
            <title>back-arrow</title>
            <path
              fill="#b8ab37"
              d="M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
