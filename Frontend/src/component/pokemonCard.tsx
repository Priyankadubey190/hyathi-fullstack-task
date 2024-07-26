import React from "react";
import styles from "./pokemonCard.module.scss";
import { useLocation } from "react-router-dom";

export interface PokemonCardProps {
  breed: string;
  healthStatus: number;
  age: number;
  adopted: boolean;
  id: string;

  onAdopt?: () => void;
  onFeed?: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  breed,
  healthStatus,
  age,
  adopted,
  onAdopt,
  onFeed,
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
        <button className={styles.adoptButton} onClick={onAdopt}>
          {adopted ? "Already adopt" : "Adopt"}
        </button>

        {adopted && pathname === "/adopted" && (
          <button className={styles.adoptButton} onClick={onFeed}>
            Feed
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
