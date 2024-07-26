import React from "react";
import styles from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/");
  };

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
            <li
              className={styles.navItem}
              style={{ color: "red", fontWeight: "bold" }}
            >
              <button onClick={handleLogout} className={styles.navLink}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
