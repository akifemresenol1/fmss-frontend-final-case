import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import LoadingScreen from "../../components/Loading";
import {
  getStarships,
  loadMoreStarship,
  searchStarship,
} from "../../api/starships";
import getStarshipId from "../../utils/getStarshipId";
import "./Starships.css";

export default function Starships() {
  const [starships, setStarships] = useState([]);
  const [next, setNext] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchStarship = async () => {
      try {
        const response = await getStarships();
        setStarships(response.data.results);
        setNext(response.data.next);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStarship();
  }, []);

  const handleLoadMoreClick = async (nextUrl) => {
    if (!nextUrl) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await loadMoreStarship(nextUrl);
      setStarships((previousStarships) => [
        ...previousStarships,
        ...response.data.results,
      ]);
      setNext(response.data.next);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleBackToTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchStarship = async (query) => {
    try {
      setIsLoading(true);
      const response = await searchStarship(query);
      setStarships(response.data.results);
      setNext(response.data.next);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="main">
        <Header />
        <h1>Starships</h1>
        <SearchBar
          value={query}
          onInputhange={(e) => {
            setQuery(e.target.value);
          }}
          onSearch={handleSearchStarship}
        />
        <div className="card-container">
          {starships.map((starship) => {
            const imgUrl = `https://ik.imagekit.io/akifemresenol/starships/${getStarshipId(
              starship.url
            )}.png`;
            const id = getStarshipId(starship.url);
            return (
              <div className="starship-card" key={id}>
                <Link className="link" to={`/starships/${id}`}>
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
        {!next ? (
          <button className="back-to-top-button" onClick={handleBackToTopClick}>
            Back to Top
          </button>
        ) : (
          <button
            className="load-more-button"
            onClick={() => handleLoadMoreClick(next)}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}
