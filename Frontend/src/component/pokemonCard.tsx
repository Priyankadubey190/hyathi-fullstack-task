import React, { useState } from "react";
import styles from "./pokemonCard.module.scss";
import { useLocation } from "react-router-dom";

export interface PokemonCardProps {
  breed: string;
  healthStatus: number;
  age: number;
  isAdopted: boolean;
  id?: string;
  _id?: string;
  onAdopt?: () => void;
  onFeed?: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  breed,
  healthStatus,
  age,
  isAdopted,
  onAdopt,
  onFeed,
  _id,
}) => {
  const location = useLocation();
  const { pathname } = location;
  if (_id) console.log("_id", _id);

  return (
    <div
      className={`${styles.pokemonCard} ${
        isAdopted ? styles.adopted : styles.notAdopted
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
        {!isAdopted && (
          <button className={styles.adoptButton} onClick={onAdopt}>
            Adopt
          </button>
        )}
        {isAdopted && pathname === "/adopted" && (
          <button className={styles.adoptButton} onClick={onFeed}>
            Feed
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
