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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVoteTitle, setSelectedVoteTitle] = useState(voteTitle || '');
  const [selectedCandidate, setSelectedCandidate] = useState(null); 
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
    setSelectedVoteTitle(voteTitle);  

  }, [voteTitle]);
  
  useEffect(() => {
    const fetchVoteData = async () => {
      try {
        const voteResponse = await axios.get(`/board/vote`);
        if (voteResponse.status === 200) {
          voteDataRef.current = voteResponse.data;
          console.log('투표 데이터:', voteDataRef.current);
  
          
          setSelectedVoteTitle(voteTitle);
  
          console.log('selectedVoteTitle:', selectedVoteTitle);
          console.log('voteDataRef.current:', voteDataRef.current);
  
          const selectedVote = voteDataRef.current.find((vote) => vote.title == selectedVoteTitle);
          console.log('selectedVote:', selectedVote);
  
          if (selectedVote) {
            const selectedVoteCode = selectedVote.voteCode;
            console.log('선택한 투표의 voteCode:', selectedVoteCode);
  
            axios
              .get(`/board/candidates/${selectedVoteCode}`)
              .then((response) => {
                const candidates = response.data;
                console.log('후보자 정보:', candidates);
  
                console.log('selectedVoteTitle:', voteTitle);
                console.log('candidateData:', candidates);
  
                setCandidateData(candidates);
              })
              .catch((error) => {
                console.error('후보자 정보를 가져오기 실패했습니다.', error);
              });
          }
        } else {
          console.error('투표 정보를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('투표 정보를 불러오는 데 실패했습니다.', error);
      }
    };
  
    fetchVoteData();
  }, [voteTitle]);
  


  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/board/qnaposts`);
      if (response.status === 200) {
        setPosts(response.data.tableposts);
      } else {
        console.error('게시물을 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('게시물을 불러오는 데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleWriteClick = () => {
    setShowWritingForm(true);
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
    
    if (selectedCandidate === candidateName) {
      setSelectedCandidate(null);
    } else {
      setSelectedCandidate(candidateName);
    }
  
    
  };

  const getCurrentPagePosts = () => {
    if (selectedVoteTitle) {
      let filteredPosts = tableposts.filter((post) => post.voteName === selectedVoteTitle);
      if (selectedCandidate) { 
        filteredPosts = filteredPosts.filter((post) => post.candidate === selectedCandidate);
      }
      return filteredPosts;
    } else {
      // selectedVoteTitle이 없을 때 (게시판이 선택되지 않았을 때) 모든 게시물 반환
      return tableposts;
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
                  <div className="candidates-container">
                  {candidateData.length > 0 ? (
                    candidateData.map((candidate) => (
                      <button
                        key={candidate.id}
                        onClick={() => handleCandidateClick(candidate.candidateName)}
                        className={`candidate-button ${selectedCandidate === candidate.candidateName ? 'active' : ''}`}
                      >
                        {candidate.candidateName}
                      </button>
                    ))
                  ) : null } {/* 후보자 버튼은 데이터가 있을 때만 렌더링 */}
                </div>
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
              <p>선택한 투표 게시판이 없거나 후보자가 없습니다</p>
            )
          )}
        </>
      )}
    </div>
  );
}

export default Qnatable;


