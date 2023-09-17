import React, { useState, useEffect, useRef, useCallback,  useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Qnatable.css';
import axios from 'axios';
import WritingForm from '../WriteAll/WritingForm';
import AuthContext from '../../../Store/auth-context';

function Qnatable() {
  const [showWritingForm, setShowWritingForm] = useState(false);
  const navigate = useNavigate();
  const [tableposts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVoteTitle, setSelectedVoteTitle] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);
  const voteDataRef = useRef([]);
  const categoriesRef = useRef([]);
  const [userDepartment, setUserDepartment] = useState('');
  const [voteCodes, setVoteCodes] = useState([]);
  const [voteButtons, setVoteButtons] = useState([]);


  // 후보자 데이터를 React 상태로 관리
  const [candidateData, setCandidateData] = useState([]);

  const [isViewingPosts, setIsViewingPosts] = useState(false);

  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (ctx.isLoggedIn === false) {
      navigate("/");
      alert("로그인 후 이용해 주세요");
    }
  }, [ctx.isLoggedIn, navigate]);
  
  
  const fetchVoteData = useCallback(async () => {
    try {
      const voteResponse = await axios.get(`/board/vote`);
      if (voteResponse.status === 200) {
        voteDataRef.current = voteResponse.data;
        setIsLoading(false);
        fetchPosts();
      } else {
        console.error('투표 정보를 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('투표 정보를 불러오는 데 실패했습니다.', error);
    }
  }, []);

  
  
  
  useEffect(() => {
    
    fetchVoteData();

    // 사용자의 학과에 해당하는 voteCode 값을 서버에서 가져옴
    axios.get('/board/voteCodeForUser')
    .then((userResponse) => {
      const userVoteCodes = userResponse.data.voteCodes;
  
      // userVoteCodes를 사용하여 유저의 투표 버튼을 생성
      const userVoteButtons = userVoteCodes.map((userVoteCode) => {
        // userVoteCode와 일치하는 vote를 찾음
        const vote = voteDataRef.current.find((v) => v.voteCode === userVoteCode);
  
        if (vote) {
          // 해당 투표가 존재하면 버튼을 생성
          return (
            <button
              key={vote.id}
              onClick={() => handleVoteClick(vote.title)}
              className={`category-button ${selectedVoteTitle === vote.title ? 'active' : ''}`}
            >
              {vote.title}
            </button>
          );
        }
        return null; // 존재하지 않는 투표의 경우 null 반환
      });
  
      // 'ALL' 부서의 투표 버튼을 가져옴
      axios.get('/board/allDepartmentVotes')
        .then((allDepartmentResponse) => {
          const allDepartmentVoteButtons = allDepartmentResponse.data;
  
          // userVoteButtons 배열에 'ALL' 부서의 투표 버튼을 추가
          allDepartmentVoteButtons.forEach((voteButton) => {
            const voteTitle = voteButton.title;
            console.log(voteTitle);
  
            // userVoteButtons에 새로운 버튼 추가
            userVoteButtons.push(
              <button
                key={voteTitle}
                onClick={() => handleVoteClick(voteTitle)}
                className="category-button"
              >
                {voteTitle}
              </button>
            );
          });
  
          // 생성한 버튼들을 화면에 렌더링
          setVoteButtons(userVoteButtons);
        })
        .catch((error) => {
          console.error('투표 정보를 가져오는 데 실패했습니다.', error);
        });
    })
    
  
  
  

  }, [fetchVoteData]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/board/qnaposts`);
      if (response.status === 200) {
        setPosts(response.data.tableposts);
      } else {
        console.error('게시물을 불러오는 데 실패했습니다.');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('게시물을 불러오는 데 실패했습니다.', error);
    }
  };

  const handleWriteClick = () => {
    setShowWritingForm(!showWritingForm);
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

  const handleVoteClick = async (voteTitle) => {
    if (selectedVoteTitle === voteTitle) {
      return;
    }

    setSelectedVoteTitle(voteTitle);
    setSelectedCandidate(null);
    setIsViewingPosts(true);

    try {
      const vote = voteDataRef.current.find((v) => v.title === voteTitle);
      if (vote) {
        const response = await axios.get(`/board/candidates/${vote.voteCode}`);
        if (response.status === 200) {
          const candidateData = response.data;
          const candidates = Object.values(candidateData);
          setCandidateData(candidates); // 후보자 데이터를 React 상태로 업데이트
        } else {
          console.error('후보자 정보를 불러오는 데 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('후보자 정보를 불러오는 데 실패했습니다.', error);
    }
  };

  const handleCandidateClick = (candidateName) => {
    setSelectedCandidate(candidateName);
    setCurrentPage(1);
  };

  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return tableposts
      .filter((post) => {
        if (selectedVoteTitle === null) {
          return true;
        }
        if (selectedCandidate === null) {
          return post.voteName === selectedVoteTitle;
        }
        return post.voteName === selectedVoteTitle && (post.candidate === selectedCandidate || post.candidate === null);
      })
      .slice(startIndex, endIndex);
  };

  return (
    <>
      
      {isLoading ? (
        <p>게시물을 불러오는 중입니다...</p>
      ) : showWritingForm ? (
        <WritingForm
          addPostToTable={addPostToTable}
          selectedVoteTitle={selectedVoteTitle}
          candidateData={candidateData}
        />
      ) : isViewingPosts ? (
        <>
          <div className="qna-container">
            <div ref={(element) => (categoriesRef.current[selectedVoteTitle] = element)}>
              {selectedVoteTitle !== null && <h2>{selectedVoteTitle}</h2>}
              <table className="qnatable-table">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>날짜</th>
                    <th>조회수</th>
                  </tr>
                </thead>
                <tbody className="table-body qnatable-table">
                  {getCurrentPagePosts().map((post, index) => (
                    <tr key={post.id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link
                          to={`/post/${post.id}`}
                          onClick={() => handlePostClick(post.id)}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td>{post.name}</td>
                      <td>{post.date}</td>
                      <td>{post.view}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="write-button-container">
            {selectedVoteTitle !== null && (
              <button onClick={handleWriteClick} className="btn btn-default btn-write">
                글 작성하기
              </button>
            )}
          </div>
          {selectedVoteTitle !== null && (
            <div className="candidates-container">
              {console.log('candidateData:', candidateData)}
              {candidateData.map((candidate, index) => (
                <button
                  key={index}
                  onClick={() => handleCandidateClick(candidate.candidateName)}
                  className={`candidate-button ${selectedCandidate === candidate.candidateName ? 'active' : ''}`}
                >
                  {candidate.candidateName}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="categories">
            {voteButtons}
          </div>
        </>
      )}
    </>
  );
}

export default Qnatable;
