import React, { useEffect, useState } from "react";
import { isEmail } from "../helpers/helper";
import "../components/styles/signUp.css";
import axiosInstance from "../helpers/axiosInstance";
import { useNavigate } from "react-router-dom";
import AuthContext from "../helpers/authContext";

const SignUp = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, setIsLoggedIn, setUserDeatils } =
    React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    // Validate confirm password against the original password
    if (value !== userData.password) {
      setError("Passwords do not match.");
    } else {
      setError(""); // Clear error if passwords match
    }
  };

  const validateForm = () => {
    const { firstname, lastname, email, username, password } = userData;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      return "All fields are required.";
    }
    if (!isEmail(email)) {
      return "Please enter a valid email address.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError(""); // Clear any previous error messages

    console.log("User data submitted:", userData);

    axiosInstance
      .post("/signup", userData)
      .then((response) => {
        if (response.data.success) {
          console.log("Sign up successful:", response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUserDeatils(response.data.user);
          setIsLoggedIn(true);
          // Reset form after submission
          setUserData({
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/");
        } else {
          setError(response.data.message || "Sign up failed");
        }
      })
      .catch((error) => {
        console.error("There was an error signing up!", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      // If user is already logged in, redirect to home page
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <input
        type="text"
        name="firstname"
        placeholder="Firstname"
        className="input-field"
        value={userData.firstname}
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="lastname"
        placeholder="Lastname"
        className="input-field"
        value={userData.lastname}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        className="input-field"
        value={userData.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="input-field"
        value={userData.username}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input-field"
        value={userData.password}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="input-field"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      {error && <p className="error-message">{error}</p>}
      <button className="signup-button" onClick={handleSignUp}>
        Sign Up
      </button>
      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default SignUp;
