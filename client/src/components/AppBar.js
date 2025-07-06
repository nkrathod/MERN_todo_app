import React, { useState, useEffect, useContext } from "react";
import "../components/styles/appBar.css";
import axiosInstance from "../helpers/axiosInstance";
import authContext from "../helpers/authContext";

const AppBar = () => {
  const { isLoggedIn, setIsLoggedIn, userDetails, setUserDeatils } =
    useContext(authContext);
  const [firstname, setFirstname] = useState("");

  const handleLogin = () => {
    window.location.href = "/login"; // Redirect to login page
  };

  const handleLogout = () => {
    axiosInstance
      .post("/logout")
      .then((response) => {
        console.log("Logout successful:", response.data);
        localStorage.removeItem("token"); // Clear token from local storage
        localStorage.removeItem("user"); // Clear user data from local storage
        setUserDeatils(null); // Clear user details in context
        setIsLoggedIn(false);
        window.location.href = "/login"; // Redirect to login page
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  useEffect(() => {
    if (userDetails && userDetails !== null && userDetails.firstname) {
      setFirstname(userDetails.firstname);
    }
  }, [userDetails]);

  return (
    <div className="app-bar">
      <h1 className="app-name"><i className="fa-solid fa-clipboard-list"></i> MERN Todo App</h1>
      <div className="app-bar-right">
        {isLoggedIn && userDetails && (
          <div className="username"><i class="fa-solid fa-circle-user"></i> {firstname}</div>
        )}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="button">
            Logout
          </button>
        ) : (
          <button onClick={handleLogin} className="button">
            Login
          </button>
        )}
      </div>
    </div>
  );
};
export default AppBar;
