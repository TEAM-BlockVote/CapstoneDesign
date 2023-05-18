import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({
  isLoggedIn: false,
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    axios.get('/auth/isLoggedIn')
    .then((res) => {
      setIsLoggedIn(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [isLoggedIn]);

  const logout = async () => {
    try {
      await axios.get('/auth/logout');
      setIsLoggedIn(null);
      alert("로그아웃 완료");
    } catch (error) {
      console.log("로그아웃 에러", error);
    }
  };

  return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, logout: logout}}> {props.children} </AuthContext.Provider>
}

export default AuthContext;