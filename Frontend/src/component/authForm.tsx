import React, { useState } from "react";
import styles from "./authForm.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:8080/api/auth/login"
      : "http://localhost:8080/api/auth/signup"; //

    const formData = {
      username: name,
      userEmail: email,
      password,
    };

    axios
      .post(url, formData)
      .then((response) => {
        const { token, username } = response.data;

        if (isLogin) {
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          navigate("/pokemon");
        } else {
          setIsLogin(true);
        }
        setSuccess(response.data.message);
        setError(null);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "An error occurred");
        setSuccess(null);
      });
  };

  return (
    <div className={styles.authContainer}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button
        className={styles.toggleButton}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Switch to Sign Up" : "Switch to Login"}
      </button>
    </div>
  );
};

export default AuthForm;
