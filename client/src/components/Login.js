import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../helpers/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../components/styles/login.css";
import { isEmail } from "../helpers/helper";
import AuthContext from "../helpers/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, setIsLoggedIn, setUserDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (isEmail(value)) {
      setEmail(value);
      setError("");
    } else {
      setError("Please enter a valid email address");
    }
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError("Username and password are required");
      return;
    } else {
      setError(""); // Clear error if inputs are valid
      axiosInstance
        .post("/login", {
          email,
          password,
        })
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setIsLoggedIn(true);
            setUserDetails(response.data.user);
            navigate("/"); // Redirect to home page
          } else {
            setError(response.data.message || "Login failed");
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            setError(error.response.data.message);
          }
          console.error("There was an error logging in!", error);
        });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // If user is already logged in, redirect to home page
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        placeholder="Email or Username"
        className="input-field"
        value={input}
        onChange={(e) => handleInputChange(e)}
      />
      <input
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        className="input-field"
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* Display an error message if login fails */}
      {error && <div className="login-error">{error}</div>}
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <p className="signup-link">
        Create a account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
