import React, { useEffect, useState } from "react";
import "./Starships.css";

import { Link } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";

import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import LoadingScreen from "../../components/Loading";
import { REACT_APP_API_BASE_URL } from "../../api/starships";
import getStarshipId from "../../utils/getStarshipId";

export default function Starships() {
  const [starships, setStarships] = useState([]);
  const [starship, setStarship] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedStarship, setSelectedStarship] = useState(null);
  const [loadedAllStarships, setLoadedAllStarships] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  const getId = starship ? getStarshipId(starship.url) : null;
  const imgUrl = getId
    ? `https://ik.imagekit.io/akifemresenol/starships/${getId}.png?updatedAt=1682374179359`
    : null;

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_BASE_URL}?page=${page}`)
      .then((response) => {
        setStarships((prevStarships) => [
          ...prevStarships,
          ...response.data.results.map((starship) => {
            return {
              name: starship.name,
              model: starship.model,
              id: starship.url.split("/").filter(Boolean).pop(),
              hyperdrive_rating: starship.hyperdrive_rating,
            };
          }),
        ]);
        if (response.data.next === null) {
          setLoadedAllStarships(true);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const handleStarshipClick = (starship) => {
    setSelectedStarship(starship);
  };

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleBackToTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // console.log(query);
  const searchStarship = (query) => {
    return axios
      .get(`https://swapi.dev/api/starships/?search=${query}`)
      .then((response) => {
        setStarships(
          response.data.results.map((starship) => {
            return {
              name: starship.name,
              model: starship.model,
              id: starship.url.split("/").filter(Boolean).pop(),
              hyperdrive_rating: starship.hyperdrive_rating,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="main">
          <Header />
          <h1>Starships</h1>
          <SearchBar
            value={query}
            onInputhange={(e) => {
              setQuery(e.target.value);
            }}
            onSearch={searchStarship}
          />
          <div className="card-container">
            {starships.map((starship) => {
              const imgUrl = `https://ik.imagekit.io/akifemresenol/starships/${starship.id}.png?updatedAt=1682374179359`;
              console.log(starship.hyperdrive_rating);

              return (
                <div
                  className="starship-card"
                  key={starship.id}
                  onClick={() => handleStarshipClick(starship)}
                >
                  <Link className="link" to={`/starships/${starship.id}`}>
                    <h2>{starship.name}</h2>
                    <p>{starship.model}</p>
                    <div className="img-ship">
                      {imgUrl && <img src={imgUrl} alt="img" />}
                    </div>
                    <div className="rating">
                      {starship.hyperdrive_rating !== "0" && (
                        <ReactStars
                          count={5}
                          size={24}
                          activeColor="#ffe81f"
                          value={Number(starship.hyperdrive_rating)}
                          edit={false}
                          isHalf
                        />
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          {loadedAllStarships ? (
            <button
              className="back-to-top-button"
              onClick={handleBackToTopClick}
            >
              Back to Top
            </button>
          ) : (
            <button className="load-more-button" onClick={handleLoadMoreClick}>
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
}
