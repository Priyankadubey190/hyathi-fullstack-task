import React, { useState, useEffect } from "react";
import styles from "./home.module.scss";

import axios from "axios";
import PokemonCard, { PokemonCardProps } from "../component/pokemonCard";
import { Loader } from "../component/loader";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState<PokemonCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const token = localStorage.getItem("token");

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const fetchData = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(
        `http://localhost:8080/api/pokemon?page=${page}`,
        { headers }
      );
      setData(response.data.pokemon);
      setPage(Number(response.data.currentPage));
      setTotalPage(response.data.totalPages);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setData([]);
    }
  };

  const handleAdopt = (id: string) => {
    axios
      .post(
        `http://localhost:8080/api/adopt/addToAdopt/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/");
        }
        setError(
          err.response?.data?.message || "An error occurred while adopting"
        );
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <div className={styles.pokemonContainer}>
        {data.length > 0 ? (
          data.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              breed={pokemon.breed}
              age={pokemon.age}
              healthStatus={pokemon.healthStatus}
              isAdopted={pokemon.adopted}
              id={pokemon.id}
              onAdopt={() => handleAdopt(pokemon.id)}
            />
          ))
        ) : error ? (
          <div className={styles.errorMessage}>{error}</div>
        ) : (
          <Loader />
        )}
      </div>
      <div className={styles.paginationContainer}>
        <button
          className={`${styles.paginationButton} ${
            page === 1 ? styles.disabled : ""
          }`}
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className={`${styles.paginationButton} ${
            page === totalPage ? styles.disabled : ""
          }`}
          onClick={handleNextPage}
          disabled={page === totalPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
