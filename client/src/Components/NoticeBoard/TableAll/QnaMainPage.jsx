import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './QnaMainPage.css';
import axios from 'axios';
import AuthContext from '../../../Store/auth-context';

function QnaMainPage() {
  const navigate = useNavigate();
  const voteDataRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVoteTitle, setSelectedVoteTitle] = useState(null);
  const [voteButtons, setVoteButtons] = useState([]);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (ctx.isLoggedIn === false) {
      navigate("/");
      alert("로그인 후 이용해 주세요");
    }
  }, [ctx.isLoggedIn, navigate]);

  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const voteResponse = await axios.get(`/board/vote`);
        if (voteResponse.status === 200) {
          voteDataRef.current = voteResponse.data;
          setIsLoading(false);
        } else {
          console.error('투표 정보를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('투표 정보를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchVoteData();

    axios
      .get('/board/voteCodeForUserAndAllDepartment')
      .then((response) => {
        const { userVoteCodes, allVoteCodes } = response.data;

        // 사용자 학과와 "ALL" 학과의 투표 버튼을 생성하는 함수
        const generateButtons = (voteCodes) => {
          return voteCodes.map((voteCode) => {
            // voteCode와 일치하는 vote를 찾음
            const vote = voteDataRef.current.find((v) => v.voteCode === voteCode);

            if (vote) {
              // 해당 투표가 존재하면 버튼을 생성
              return (
                <button
                  key={vote.id}
                  onClick={() => handleVoteClick(vote.title)} // voteCode 전달 제거
                  className={`category-button ${selectedVoteTitle === vote.title ? 'active' : ''}`}
                >
                  {vote.title}
                </button>
              );
            }
            return null; // 존재하지 않는 투표의 경우 null 반환
          });
        };

        // 사용자 학과와 "ALL" 학과의 투표 버튼을 합친 후 생성
        const userVoteButtons = generateButtons(userVoteCodes);
        const allVoteButtons = generateButtons(allVoteCodes);

        // 사용자 학과 투표 버튼과 "ALL" 학과 투표 버튼을 합쳐서 화면에 렌더링
        setVoteButtons([...userVoteButtons, ...allVoteButtons]);
      })
      .catch((error) => {
        console.error('투표 정보를 가져오는 데 실패했습니다.', error);
      });
  }, [ctx.isLoggedIn]);

  const handleVoteClick = (voteTitle) => {
    // 투표 버튼 클릭 시 해당 투표 게시글로 이동
    navigate(`/qnatable/${voteTitle}`);
  };

  return (
    <>
      <div className="custom-wrap">
        <div className="custom-content">
          <div className="custom-left">
            <h1 className="custom-title">
              <span className="custom-qna">Q&A</span> 페이지
            </h1>
            <span className="custom-h2">당신이 질문할 후보자가 있는 투표를 선택하세요!</span>
            <p>
              저희 'Blockvote'는 유권자들에게 Q&A페이지를 제공합니다.<br />
              많은 투표 플랫폼들은 Q&A페이지를 제공하지 않습니다<br />
              투표 플랫폼에서 Q&A페이지가 주는 여러가지 부정적인 작용<br />
              익명 사용자의 무분별한 도배, 광고성 게시글 등의 문제를 <br />
              'Blockvote'에서는 인증된 사용자만이<br />
              이 페이지를 이용할 수 있게 운영됩니다.
            </p>
          </div>
        </div>
      </div>
      <div className="categories">
        {voteButtons}
      </div>
    </>
  );
}

export default QnaMainPage;
