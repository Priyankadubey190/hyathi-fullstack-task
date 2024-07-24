import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import PokemonCard from "../component/pokemonCard";
import { useNavigate } from "react-router-dom";

function AdoptedPokemon() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAdoptedPokemon = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .get("http://localhost:8080/api/adopt", { headers })
      .then((response: AxiosResponse) => {
        console.log("www", response.data.items);
        setData(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching adopted Pokemon:", error);
        if (error.response && error.response.status === 500) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/");
        }
      });
  };

  const onFeed = (id: string) => {
    axios
      .post(
        `http://localhost:8080/api/adopt/feed/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        fetchAdoptedPokemon();
      })
      .catch((error) => {
        console.error("Error feeding Pokemon:", error);
        if (error.response && error.response.status === 500) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/");
        }
      });
  };

  useEffect(() => {
    fetchAdoptedPokemon();
  }, []);

  useEffect(() => {
    console.log("data", data);
  }, [data]);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "90%",
        margin: "auto",
      }}
    >
      {data &&
        data.map((el) => {
          return (
            <>
              <PokemonCard
                key={el?.pokemon?._id}
                breed={el?.pokemon?.breed}
                age={el?.pokemon?.age}
                healthStatus={el?.pokemon?.healthStatus}
                isAdopted={el?.adopted}
                _id={el?.pokemon?._id}
                onFeed={() => onFeed(el.pokemon._id)}
              />
            </>
          );
        })}
    </div>
  );
}

export default AdoptedPokemon;
