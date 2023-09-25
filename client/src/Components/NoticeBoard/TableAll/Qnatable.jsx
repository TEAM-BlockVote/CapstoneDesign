import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Qnatable.css';
import axios from 'axios';
import WritingForm from '../WriteAll/WritingForm';
import AuthContext from '../../../Store/auth-context';
import blockImage from '../HomePage/images/blockchain.png';

function Qnatable() {
  const navigate = useNavigate();
  const [showWritingForm, setShowWritingForm] = useState(false);
  const { voteTitle, voteCode } = useParams();
  const [tableposts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 초기값 변경
  const [selectedVoteTitle, setSelectedVoteTitle] = useState(voteTitle);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);
  const voteDataRef = useRef([]);
  const categoriesRef = useRef([]);
  const [userDepartment, setUserDepartment] = useState('');
  const [voteCodes, setVoteCodes] = useState([]);
  const [voteButtons, setVoteButtons] = useState([]);
  const [candidateData, setCandidateData] = useState([]);
  const [isViewingPosts, setIsViewingPosts] = useState(true);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (ctx.isLoggedIn === false) {
      navigate('/');
      alert('로그인 후 이용해 주세요');
    }
  }, [ctx.isLoggedIn, navigate]);
  
  useEffect(() => {
    
    if (voteTitle && voteDataRef.current) {
      // 선택한 투표의 이름을 사용하여 해당 투표의 voteCode를 찾음
      const selectedVote = voteDataRef.current.find((vote) => vote.title === voteTitle);
      if (selectedVote) {
        const selectedVoteCode = selectedVote.voteCode;
        console.log('선택한 투표의 voteCode:', selectedVoteCode);
  
        // 선택한 투표의 voteCode를 사용하여 후보자 정보를 가져옴
        axios
          .get(`/board/candidates/${selectedVoteCode}`)
          .then((response) => {
            // response.data에 후보자 정보가 포함됨
            const candidates = response.data;
            console.log('후보자 정보:', candidates);
  
            // 후보자 정보를 candidateData 상태 변수에 설정
            setCandidateData(candidates);
          })
          .catch((error) => {
            console.error('후보자 정보를 가져오는 데 실패했습니다.', error);
          });
      }
    }
  }, [voteTitle, voteCode]);
  
  const fetchVoteData = useCallback(async () => {
    try {
      const voteResponse = await axios.get(`/board/vote`);
      if (voteResponse.status === 200) {
        voteDataRef.current = voteResponse.data;
      } else {
        console.error('투표 정보를 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('투표 정보를 불러오는 데 실패했습니다.', error);
    }
  }, []);
  
  useEffect(() => {
    fetchVoteData();
  }, [fetchVoteData]);
  
  const fetchPosts = useCallback(async () => { // fetchPosts 함수를 useCallback으로 감싸서 의존성 배열에 추가
    try {
      setIsLoading(true); // 데이터 로딩 시작
      const response = await axios.get(`/board/qnaposts`);
      if (response.status === 200) {
        setPosts(response.data.tableposts);
      } else {
        console.error('게시물을 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('게시물을 불러오는 데 실패했습니다.', error);
    } finally {
      setIsLoading(false); // 데이터 로딩 완료
    }
  }, []);
  
  useEffect(() => {
    fetchPosts(); // 컴포넌트가 처음 마운트될 때 데이터를 가져오도록 호출
  }, [fetchPosts]);

  const handleWriteClick = () => {
    setShowWritingForm(true); // "글 작성하기" 버튼을 누를 때 글 작성 폼을 보이도록 상태 변경
  };

  const handlePostClick = async (postId) => {
    try {
      await axios.post(`/board/qnaposts/${postId}/increase-view`);
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error('조회수 증가 요청에 실패했습니다.', error);
    }
  };

  const addPostToTable = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const handleCandidateClick = (candidateName) => {
    setSelectedCandidate(candidateName);
    setCurrentPage(1);
    };

  const getCurrentPagePosts = () => {
    if (selectedVoteTitle) {
      // 선택한 투표의 title 값과 일치하는 게시글만 필터링
      let filteredPosts = tableposts.filter((post) => post.voteName === selectedVoteTitle);

      // 선택한 후보자의 candidate 값과 일치하는 게시글만 필터링
      if (selectedCandidate) {
        filteredPosts = filteredPosts.filter((post) => post.candidate === selectedCandidate);
      }
      return filteredPosts;
    }
  };

  return (
    <div className="qnatable-container">
      {showWritingForm ? (
        <WritingForm
          addPostToTable={addPostToTable}
          selectedVoteTitle={selectedVoteTitle}
          candidateData={candidateData}
        />
      ) : (
        <>
          {isLoading ? (
            <p>게시물을 불러오는 중입니다...</p>
          ) : (
            isViewingPosts && selectedVoteTitle !== null ? (
              <div className="qnatable-content">
                {selectedVoteTitle !== null && (
                    <button onClick={handleWriteClick} className="btn-write">
                      글 작성하기
                    </button>
                  )}
                <div className={`btn-write-parent ${showWritingForm ? 'hidden' : ''}`}>
                  <div ref={(element) => (categoriesRef.current[selectedVoteTitle] = element)}>
                    {selectedVoteTitle !== null && <h2>{selectedVoteTitle} 투표 게시판</h2>}
                  </div>
                  {selectedVoteTitle && (
                      <div className="candidates-container">
                        {candidateData.map((candidate) => (
                          <button
                            key={candidate.id}
                            onClick={() => handleCandidateClick(candidate.candidateName)}
                            className={`candidate-button ${selectedCandidate === candidate.candidateName ? 'active' : ''}`}
                          >
                            {candidate.candidateName}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
                <div id="q_table-container" className={`qnatable-table-container ${showWritingForm ? 'hidden' : ''}`}>  
                  <div id="qna-wrap">
                  <div id="side">
                    <div id="side_banner1">
                      <a href="#">
                        <h1>지금 어떤 후보자를 찾을지<br />
                          고민이시라구요?</h1>
                        <p>지금 '나후찾'을 이용해보세요!</p>
                        <img src="https://grepp-programmers.s3.amazonaws.com/production/file_resource/3140/Community-Banner_cote.png" alt="Banner" />
                      </a>
                    </div>
                  </div>
                  </div>
                  <table id="q_table">
                  <tbody className={`table-body qnatable-table ${showWritingForm ? 'hidden' : ''}`}>
                    {getCurrentPagePosts().map((post, index) => (
                      <tr key={post.id}>
                        <td>
                          <Link
                            to={`/post/${post.id}`}
                            onClick={() => handlePostClick(post.id)}
                          >
                            {post.title}
                          </Link>
                        </td>
                        <td>{post.name}</td>
                        <td>{post.date}</td>
                        <td>조회수: {post.view}</td>
                      </tr>
                    ))}
                     </tbody>
                    </table>
                   </div>
                  </div>
            ) : (
              <p>선택한 투표 게시판이 없거나 후보자가 없습니다.</p>
            )
          )}
        </>
      )}
    </div>
  );
}

export default Qnatable;


