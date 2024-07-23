import React from "react";
import styles from "./header.module.scss";

export const Header: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>Pokemon App</div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Login
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Signup
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Pokemon
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Adopted
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
