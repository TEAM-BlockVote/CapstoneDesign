import { createBrowserRouter } from "react-router-dom";
import Main from '../Components/Main/Main';
import NoticeHome from "../Components/NoticeBoard/HomePage/NoticeHome";
import RootLayout from "../Components/Main/RootLayout";
import SignIn from "../Components/Register/SignIn";
import WritingForm from "../Components/NoticeBoard/WriteAll/WritingForm";
import AdminMain from "../Components/AdminPage/AdminMain";
import SetVote from "../Components/AdminPage/SetVote";
import AdditionalInfo from "../Components/Register/AdditionalInfo";
import NawooMain from "../Components/Nawoo/Main";
import VotingMain from "../Components/Vote/VotingMain";
import QnaPosted from "../Components/NoticeBoard/TableAll/QnaPosted";
import CategorySelect from "../Components/Nawoo/CategorySelect";
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {path: '/', element: <Main/>},
      {path: '/notice', element: <NoticeHome/>},
      {path: '/signIn', element: <SignIn/>},
      {path: '/WritingForm', element: <WritingForm/>},
      {path: '/AdminMain', element: <AdminMain/>},
      {path: '/AdminMain/view/:id', element: <SetVote/>},
      {path: '/post/:id', element: <QnaPosted/>},
      {path: '/voting', element: <VotingMain/>},
    ],
  },
  {path: '/additionalInfo', element: <AdditionalInfo/>},
  {path: '/Nawoo', element: <NawooMain/>},
  {path: '/Nawoo/CategorySelect/:voteCode', element: <CategorySelect/>},
]);

export default router;
