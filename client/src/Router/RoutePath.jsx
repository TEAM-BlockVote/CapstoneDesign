import { createBrowserRouter } from "react-router-dom";

import Main from '../Components/Main/Main';
import NoticeHome from "../Components/NoticeBoard/HomePage/NoticeHome";

import RootLayout from "../Components/Main/RootLayout";
<<<<<<< Updated upstream
import JoinNormalWeb from "../Components/Register/JoinNormalWeb";
import LogLoginWeb from "../Components/Register/LogLoginWeb";
import LogJoinWeb from "../Components/Register/LogJoinWeb";
import JoinManageWeb from "../Components/Register/JoinManageWeb";
import Post1 from "../Components/NoticeBoard/Posted/Post1"
import Post2 from "../Components/NoticeBoard/Posted/Post2"
import Post3 from "../Components/NoticeBoard/Posted/Post3"
import WritingForm from "../Components/NoticeBoard/WriteAll/WritingForm";
import AdmainMain from "../Components/AdminPage/AdminMain";
=======
import SignIn from "../Components/Register/SignIn";
import WritingForm from "../Components/NoticeBoard/WriteAll/WritingForm";
import AdminMain from "../Components/AdminPage/AdminMain";
import SetVote from "../Components/AdminPage/SetVote";
import AdditionalInfo from "../Components/Register/AdditionalInfo";
import NawooPage from "../Components/Nawoo/NawooPage";
import VotingMain from "../Components/Vote/VotingMain";
import QnaPosted from "../Components/NoticeBoard/TableAll/QnaPosted";
>>>>>>> Stashed changes

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {path: '/', element: <Main/>},
      {path: '/notice', element: <NoticeHome/>},
<<<<<<< Updated upstream
      {path: '/signIn', element: <LogLoginWeb/>},
      {path: '/signUp', element: <LogJoinWeb/>},
      {path: '/test1', element: <JoinNormalWeb/>},
      {path: '/test2', element: <JoinManageWeb/>},
      {path: '/post1', element: <Post1/>},
      {path: '/post2', element: <Post2/>},
      {path: '/post3', element: <Post3/>},
      {path: '/WritingForm', element: <WritingForm/>},
      {path: '/AdmainMain', element: <AdmainMain/>},
=======
      {path: '/signIn', element: <SignIn/>},
      {path: '/WritingForm', element: <WritingForm/>},
      {path: '/AdminMain', element: <AdminMain/>},
      {path: '/AdminMain/view/:id', element: <SetVote/>},
      {path: '/post/:id', element: <QnaPosted/>},
     
      {path: '/voting', element: <VotingMain/>},
>>>>>>> Stashed changes
    ],
  },
]);

export default router;
