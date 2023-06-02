import { createBrowserRouter } from "react-router-dom";
import Main from '../Components/Main/Main';
import NoticeHome from "../Components/NoticeBoard/HomePage/NoticeHome";
import RootLayout from "../Components/Main/RootLayout";
import SignIn from "../Components/Register/SignIn";
import Post1 from "../Components/NoticeBoard/Posted/Post1";
import Post2 from "../Components/NoticeBoard/Posted/Post2";
import Post3 from "../Components/NoticeBoard/Posted/Post3";
import WritingForm from "../Components/NoticeBoard/WriteAll/WritingForm";
import AdminMain from "../Components/AdminPage/AdminMain";
import SetVote from "../Components/AdminPage/SetVote";
import AdditionalInfo from "../Components/Register/AdditionalInfo";
import NawooPage from "../Components/Nawoo/NawooPage";
import VotingMain from "../Components/Vote/VotingMain";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      { path: '/', element: <Main/> },
      { path: '/notice', element: <NoticeHome/> },
      { path: '/signIn', element: <SignIn/> },
      { path: '/post/1', element: <Post1/> },
      { path: '/post/2', element: <Post2/> },
      { path: '/post/3', element: <Post3/> },
      { path: '/', element: <WritingForm/> },
      { path: '/AdminMain', element: <AdminMain/> },
      { path: '/AdminMain/view/:id', element: <SetVote/> },
      { path: '/nawoopage', element: <NawooPage/> },
      { path: '/voting', element: <VotingMain/> },
    ],
  },
  { path: '/additionalInfo', element: <AdditionalInfo/> },
]);

export default router;
