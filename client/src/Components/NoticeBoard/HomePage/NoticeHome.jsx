import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Qnatable from "../TableAll/Qnatable.jsx";



import CandidateTabs from "../PromiseAll/CandidateTabs.jsx";
import PromiseTabs from "../PromiseAll/PromiseTabs.jsx";
import Bottom from "./Bottom.jsx";



function NoticeHome() {
  return (
    <>

      <CandidateTabs />
      <PromiseTabs />
      <Qnatable />
      <Bottom />
    </>
  );
}

export default NoticeHome;
