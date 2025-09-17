import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthContext from "./helpers/authContext";
const Home = React.lazy(() => import("./components/Home"));
const Login = React.lazy(() => import("./components/Login"));
const SignUp = React.lazy(() => import("./components/SignUp"));
const ErrorPage = React.lazy(() => import("./components/ErrorPage"));
const AppBar = React.lazy(() => import("./components/AppBar"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  }
]);
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData && userData !== "null") {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          setIsLoggedIn: setIsLoggedIn,
          userDetails: user,
          setUserDeatils: setUser,
        }}
      >
        <AppBar />
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
