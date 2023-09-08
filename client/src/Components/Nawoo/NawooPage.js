import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NawooMain from './NawooMain';
import NawooCategory from './NawooCategory';
import NawooQna from './NawooQna';
import NawooResult from './NawooResult';
import AuthContext from '../../Store/auth-context';
import "./NawooPage.css";

const NawooPage = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [voteList, setVoteList] = useState([]);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (ctx.isLoggedIn === false) {
      navigate("/");
      alert("로그인 후 이용해 주세요");
    }
  }, [ctx.isLoggedIn, navigate]);

  useEffect(() => {
    axios.get('nawoo/voteList')
    .then((res) => {
      setVoteList(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  if (voteList.length === 0) {
    return <div>데이터 로딩중...</div>;
  }

  return (
    <div className='nawoo_site'>
      <div className='nawoo_main'>
        { <NawooMain voteList={voteList}/> }
      </div>
    </div>
  );
}

export default NawooPage;