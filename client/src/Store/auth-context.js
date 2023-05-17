import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({
  isLoggedIn: false
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('/auth/isLoggedIn')
    .then((res) => {
      setIsLoggedIn(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}> {props.children} </AuthContext.Provider>
}

export default AuthContext;