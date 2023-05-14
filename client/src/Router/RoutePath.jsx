import { createBrowserRouter } from "react-router-dom";

import Main from '../Components/Main/Main';
import NoticeHome from "../Components/NoticeBoard/HomePage/NoticeHome";
import RootLayout from "../Components/Main/RootLayout";

import SignIn from "../Components/Register/SignIn";
import Post1 from "../Components/NoticeBoard/Posted/Post1"
import Post2 from "../Components/NoticeBoard/Posted/Post2"
import Post3 from "../Components/NoticeBoard/Posted/Post3"
import WritingForm from "../Components/NoticeBoard/WriteAll/WritingForm";
import AdmainMain from "../Components/AdminPage/AdminMain";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {path: '/', element: <Main/>},
      {path: '/notice', element: <NoticeHome/>},
      {path: '/signIn', element: <SignIn/>},
      {path: '/post1', element: <Post1/>},
      {path: '/post2', element: <Post2/>},
      {path: '/post3', element: <Post3/>},
      {path: '/WritingForm', element: <WritingForm/>},
      {path: '/AdmainMain', element: <AdmainMain/>},
    ],
  },
]);

export default router;
