import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VotableItemList from './VotableItemList';
import AuthContext from '../../Store/auth-context';
import "./NawooIndex.css";

const NawooIndex = () => {
  const [voteList, setVoteList] = useState([]);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (ctx.isLoggedIn === false) {
      navigate("/");
      alert("로그인 후 이용해 주세요");
    } else {
      axios.get('nawoo/voteList')
      .then((res) => {
        setVoteList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [ctx.isLoggedIn, navigate]);

  return ctx.isLoggedIn === false || ctx.isLoggedIn === null ? null : (
    <div className='nawoo_site'>
      <div className='nawoo_main'>
        { <VotableItemList voteList={voteList}/> }
      </div>
    </div>
  );
}

export default NawooIndex;
