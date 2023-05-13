import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Qnatable from "../TableAll/Qnatable.jsx";
import WriteButton from "../WriteAll/WriteButton.jsx";
import Pagination from "../TableAll/Pagination.jsx";
import Header from "../../Main/Header.js";
import CandidateTabs from "../PromiseAll/CandidateTabs.jsx";
import PromiseTabs from "../PromiseAll/PromiseTabs.jsx";
import Post1 from "../Posted/Post1.jsx";
import Post2 from "../Posted/Post2.jsx";
import Post3 from "../Posted/Post3.jsx";
//import Bottom from "./Bottom.jsx";
import WritingForm from "../WriteAll/WritingForm.jsx";

function NoticeHome() {
return (
<BrowserRouter>
<Header />
<CandidateTabs />
<PromiseTabs />
<Routes>
<Route path="/" element={<Qnatable />} />
<Route path="/post1" element={<Post1 />} />
<Route path="/post2" element={<Post2 />} />
<Route path="/post3" element={<Post3 />} />
<Route path="/WritingForm" element={<WritingForm />} /> 
</Routes>
<WriteButton />
<Pagination  />
{/* <Bottom /> */}
</BrowserRouter>
);
}

export default NoticeHome;