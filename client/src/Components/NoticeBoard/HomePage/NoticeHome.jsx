import React from "react";
import { BrowserRouter, Routes, Route, Link,useNavigate } from "react-router-dom";
import Qnatable from "../TableAll/Qnatable.jsx";

import QnaMainPage from "../TableAll/QnaMainPage.jsx";



function NoticeHome() {
  return (
    <>
      <QnaMainPage/>
    </>
  );
}

export default NoticeHome;
