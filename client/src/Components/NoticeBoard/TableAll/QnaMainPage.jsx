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
          <span className="qna-h2">당신이 질문할 후보자가 있는 투표를 선택하세요!</span>
          <p>
            저희 'Blockvote'는 유권자들에게 Q&A페이지를 제공합니다.<br />
            많은 투표 플랫폼들은 Q&A페이지를 제공하지 않습니다<br />
            투표 플랫폼에서 Q&A페이지가 주는 여러가지 부정적인 작용<br />
            익명 사용자의 무분별한 도배, 광고성 게시글 등의 문제를 <br />
            'Blockvote'에서는 인증된 사용자만이<br />
            이 페이지를 이용할 수 있게 운영됩니다.
          </p>
        </div>
        <div className="categories">
        {!voteList ? <Loding/> : voteList.map((candidate, index) => (
          <div className="qna-right" key={index}>
            <Link to={`/qnatable/${candidate.voteCode}`} key={index}>
              <button className="qna-button">
                {candidate.title}    
              </button>    
            </Link>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default QnaMainPage;
