import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (auth) => {},
  userDetails: {},
  setUserDeatils: (user) => {},
});

export default AuthContext;