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
          <p className='qna_info'>
            저희 Blockvote는 유권자들에게 Q&A페이지를 제공합니다.
          </p>
          <p className='qna_info'>
            투표 플랫폼에서 Q&A 페이지가 주는 여러가지 부정적인 작용으로는 <br/>
            익명 사용자의 무분별한 도배와 광고성 게시글 등의 문제가 있습니다.
          </p>
          <p className='qna_info'>
            그러나 'Blockvote'에서는 이러한 문제를 방지하기 위해 <br/>
            이 페이지를 이용할 수 있는 권한을 인증된 사용자에게만 부여하고 있습니다.
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
