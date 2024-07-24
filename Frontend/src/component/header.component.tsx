import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>Pokemon App</div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>
                Register
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link to="/pokemon" className={styles.navLink}>
                Pokemon
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/adopted" className={styles.navLink}>
                Adopted
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
