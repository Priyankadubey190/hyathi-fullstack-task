import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import {
  AdoptedPokemonCard,
  AdoptedPokemonCardProps,
} from "../component/adoptedPokemonCard";
import { Loader } from "../component/loader";

function AdoptedPokemon() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedLoading, setFeedLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchAdoptedPokemon = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    setLoading(true);

    axios
      .get("https://hyathi-fullstack-task-backend.onrender.com/api/adopt", {
        headers,
      })
      .then((response: AxiosResponse) => {
        setLoading(false);

        setData(response.data.items);
      })
      .catch((error) => {
        setLoading(false);

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
    setFeedLoading(true);
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
        setFeedLoading(false);

        console.log(response);
        alert("Pokemon is feeded");

        fetchAdoptedPokemon();
      })
      .catch((error) => {
        setFeedLoading(false);

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
      {!loading && data ? (
        data.map((el: AdoptedPokemonCardProps) => {
          return (
            <>
              <AdoptedPokemonCard
                key={el?.pokemon?._id}
                feedLoading={feedLoading}
                pokemon={{ ...el.pokemon }}
                adopted={el.adopted}
                onFeed={() => onFeed(el.pokemon._id)}
              />
            </>
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default AdoptedPokemon;
