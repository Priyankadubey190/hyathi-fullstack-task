import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import {
  AdoptedPokemonCard,
  AdoptedPokemonCardProps,
} from "../component/adoptedPokemonCard";

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
      .get("https://hyathi-fullstack-task-backend.onrender.com/api/adopt", {
        headers,
      })
      .then((response: AxiosResponse) => {
        console.log("www", response.data.items);
        setData(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching adopted Pokemon:", error);
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred while getting adopted pokemon";
        alert(errorMessage);
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
        `https://hyathi-fullstack-task-backend.onrender.com/api/adopt/feed/${id}`,
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
        data.map((el: AdoptedPokemonCardProps) => {
          return (
            <>
              <AdoptedPokemonCard
                key={el?.pokemon?._id}
                pokemon={{ ...el.pokemon }}
                adopted={el.adopted}
                onFeed={() => onFeed(el.pokemon._id)}
              />
            </>
          );
        })}
    </div>
  );
}

export default AdoptedPokemon;
