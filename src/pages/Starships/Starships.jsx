import React, { useEffect, useState } from "react";
import "./Starships.css";

import { Link } from "react-router-dom";
import axios from "axios";

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

  const getId = starship ? getStarshipId(starship.url) : null;
  const imgUrl = getId
    ? `https://ik.imagekit.io/akifemresenol/starships/${getId}.png?updatedAt=1682374179359`
    : null;

  const [query, setQuery] = useState("");

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
  // useState request url searching

  const filteredStarships = starships.filter(
    (starship) =>
      starship.name.toLowerCase().includes(query.toLowerCase()) ||
      starship.model.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {" "}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="title">
          <Header />
          <h1>Starships</h1>
          <SearchBar />
          <div className="card-container">
            {starships.map((starship) => {
              const imgUrl = `https://ik.imagekit.io/akifemresenol/starships/${starship.id}.png?updatedAt=1682374179359`;
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
