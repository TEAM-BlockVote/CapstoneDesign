import React from "react";
import { BrowserRouter, Routes, Route, Link,useNavigate } from "react-router-dom";
import Qnatable from "../TableAll/Qnatable.jsx";
import CandidateTabs from "../PromiseAll/CandidateTabs.jsx";
import PromiseTabs from "../PromiseAll/PromiseTabs.jsx";
import Bottom from "./Bottom.jsx";
import QnaInfo from './QnaInfo.jsx';



function NoticeHome() {
  return (
    <>
      <QnaInfo/>
      <Qnatable />
      <Bottom />
    </>
  );
}

export default NoticeHome;
