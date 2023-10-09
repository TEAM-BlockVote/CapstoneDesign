import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loding from '../../Main/Loding';
import AuthContext from '../../../Store/auth-context';
import axios from 'axios';
import './QnaMainPage.css';

function QnaMainPage() {
  const [voteList, setVoteList] = useState();
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

  return (
    <div className="qna-wrap">
      <div className="qna-content">
        <div className="qna-left">
          <h1 className="qna-title">
            <span className="custom-qna">Q&A</span> 페이지
          </h1>
          <div className='qna_writes'>
            <span className="qna-h2">당신이 질문할 후보자가 있는 투표를 선택하세요!</span>
            <p className='qna_info'>
            'Blockvote'는 유권자를 위한 Q&A 페이지를 제공합니다. <br/>
            익명 사용자의 도배 및 광고 게시물 등을 방지하기 위해 <br/>
            이 페이지는 인증된 사용자에게만 허용됩니다.
            </p>
          </div>
        </div>
        <div className="qna-right">
          <ul className='qna_categories'>
          {!voteList ? <Loding/> : voteList.map((candidate, index) => (
            <li className="qna-button" key={index}>
              <Link to={`/qnatable/${candidate.voteCode}`} key={index}>
                  {candidate.title} 
              </Link>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default QnaMainPage;
