import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Qnatable from "../TableAll/Qnatable.jsx";



import CandidateTabs from "../PromiseAll/CandidateTabs.jsx";
import PromiseTabs from "../PromiseAll/PromiseTabs.jsx";
import Post1 from "../Posted/Post1.jsx";
import Post2 from "../Posted/Post2.jsx";
import Post3 from "../Posted/Post3.jsx";
import Bottom from "./Bottom.jsx";
import WritingForm from "../WriteAll/WritingForm.jsx";


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
