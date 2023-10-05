import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({
  isLoggedIn: false,
  logout: () => {},
  userName: "",
  studentNumber: "",
  walletAddr: "",
  etherBalance: "",
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userName, setUserName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [walletAddr, setWalletAddr] = useState("");
  const [etherBalance, setEtherBalance] = useState("");

  useEffect(() => {
    axios.get('/auth/isLoggedIn')
    .then((res) => {
      console.log(res);
      setIsLoggedIn(res.data.isLoggedIn);
      setUserName(res.data.user);
      setStudentNumber(res.data.studentNumber);
      setWalletAddr(res.data.walletAddr);
      setEtherBalance(res.data.etherBalance);
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

  return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, logout: logout, userName: userName, studentNumber: studentNumber, walletAddr: walletAddr, etherBalance: etherBalance}}> {props.children} </AuthContext.Provider>
}

export default AuthContext;