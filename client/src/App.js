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

  // axiosInstance
  //     .get(`/todo/get?userId=${userDetails.username}`)
  //     .then((response) => {
  //       if (response.data && response.data.todos) {
  //         // setTodos(response.data.todos);
  //         data = response.data.todos;
  //       } else {
  //         console.error("No todos found in the response");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching todos:", error);
  //     });

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

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         {/* <Route path="/create-todo" element={<CreateTodo />} /> */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

export default App;
