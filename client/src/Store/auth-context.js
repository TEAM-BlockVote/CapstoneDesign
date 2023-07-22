import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({
  isLoggedIn: false,
  logout: () => {},
  userName: "",
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios.get('/auth/isLoggedIn')
    .then((res) => {
      setIsLoggedIn(res.data.isLoggedIn);
      setUserName(res.data.user);
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

  return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, logout: logout, userName: userName}}> {props.children} </AuthContext.Provider>
}

export default AuthContext;