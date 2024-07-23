import React from "react";
import styles from "./pokemonCard.module.scss";

interface PokemonCardProps {
  name: string;
  healthStatus: number;
  age: number;
  isAdopted: boolean;
  onAdopt: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  healthStatus,
  age,
  isAdopted,
  onAdopt,
}) => {
  return (
    <div
      className={`${styles.pokemonCard} ${
        isAdopted ? styles.adopted : styles.notAdopted
      }`}
    >
      <div className={styles.pokemonInfo}>
        <h3 className={styles.pokemonName}>{name}</h3>
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
      </div>
    </div>
  );
};

export default PokemonCard;
