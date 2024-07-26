import React from "react";
import styles from "./pokemonCard.module.scss";
import { useLocation } from "react-router-dom";

export interface AdoptedPokemonCardProps {
  pokemon: {
    _id: string;
    breed: string;
    healthStatus: number;
    age: number;
  };
  adopted: boolean;
  feedLoading: boolean;
  onFeed?: () => void;
}

export const AdoptedPokemonCard: React.FC<AdoptedPokemonCardProps> = ({
  pokemon: { breed, healthStatus, age },
  adopted,
  onFeed,
  feedLoading,
}) => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div
      className={`${styles.pokemonCard} ${
        adopted ? styles.adopted : styles.notAdopted
      }`}
    >
      <div className={styles.pokemonInfo}>
        <h3 className={styles.pokemonName}>{breed}</h3>
        <div className={styles.pokemonDetails}>
          <div className={styles.healthStatus}>
            <span>Health Status:</span>
            <span>{healthStatus}</span>
          </div>
          <div className={styles.age}>
            <span>Age:</span>
            <span>{age}</span>
          </div>
        </div>

        {adopted && pathname === "/adopted" && (
          <button
            className={styles.adoptButton}
            disabled={feedLoading}
            onClick={onFeed}
            style={{
              cursor: feedLoading ? "not-allowed" : "pointer",
            }}
          >
            Feed
          </button>
        )}
      </div>
    </div>
  );
};
