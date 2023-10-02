import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Qnatable.css';
import axios from 'axios';
import WritingForm from '../WriteAll/WritingForm';
import AuthContext from '../../../Store/auth-context';
import Loding from '../../Main/Loding';

function Qnatable() {
  const navigate = useNavigate();
  const [showWritingForm, setShowWritingForm] = useState(false);
  const { voteTitle, voteCode } = useParams();
  const [posts, setPosts] = useState([]);
  const [copyPosts, setCopyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVoteTitle, setSelectedVoteTitle] = useState(voteTitle || '');
  const [selectedCandidate, setSelectedCandidate] = useState(null); 
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
    axios.get(`/board/candidates/${voteCode}`)
    .then((response) => {
      setCandidateData(response.data);
    })
    .catch((error) => {
      console.error('후보자 정보를 가져오기 실패했습니다.', error);
    });
  }, [voteCode]);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/board/qnaposts/${voteCode}`);
      if (response.status === 200) {
        setPosts(response.data.tableposts);
        setCopyPosts(response.data.tableposts);
      } else {
        console.error('게시물을 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('게시물을 불러오는 데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  }, [voteCode]);

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
    const copyPosts = [...posts];
    const filteredData = copyPosts.filter(item => item.candidate === candidateName);
    setCopyPosts(filteredData);
    
    if (selectedCandidate === candidateName) {
      setSelectedCandidate(null);
    } else {
      setSelectedCandidate(candidateName);
    }
  };

  return (
    <div className="qnatable-container">
      {showWritingForm ? (
        <WritingForm
          addPostToTable={addPostToTable}
          candidateData={candidateData}
          setShowWritingForm={setShowWritingForm}
        />
      ) : (
        <>
          {isLoading ? (
            <Loding/>
          ) : (
            isViewingPosts && selectedVoteTitle !== null ? (
              <div className="qnatable-content">
                <div className={`btn-write-parent ${showWritingForm ? 'hidden' : ''}`}>
                  <div className="candidates-container">
                    {candidateData.map((candidate, index) => (
                      <button
                        key={index}
                        onClick={() => handleCandidateClick(candidate.candidateName)}
                        className={`candidate-button ${selectedCandidate === candidate.candidateName ? 'active' : ''}`}
                      >
                        {`기호 ${index+1}번 ${candidate.candidateName}`}
                      </button>
                    ))}
                  </div>
                  <button onClick={handleWriteClick} className="btn-write"> 글 작성하기 </button>
                </div>
                <div id="q_table-container" className={`qnatable-table-container ${showWritingForm ? 'hidden' : ''}`}>
                  <div id="qna-wrap">
                    <div id="side">
                      <div id="side_banner1">
                        <Link to={`/Nawoo`}>
                          <div style={{color: 'white'}}>
                            <h3>지금 어떤 후보자를 찾을지<br />
                              고민이시라구요?</h3>
                            <p>지금 '나후찾'을 이용해보세요!</p>
                          </div>
                          <img src="https://grepp-programmers.s3.amazonaws.com/production/file_resource/3140/Community-Banner_cote.png" alt="Banner" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <ul className="list-group list-group-flush" style={{width: '100%'}}>
                    { copyPosts.map((post, index) => (
                      <Link
                        to={`/post/${post.qnaNumber}`}
                        onClick={() => handlePostClick(post.qnaNumber)}
                        key={index}
                      >
                        <li className="list-group-item" style={{fontSize: '20px', fontWeight: 'bold'}}>
                          {post.qnaTitle}
                          <div style={{fontSize: '13px', color: '#999999'}}>
                            <span> {post.writer} </span>
                            <span>{post.makeDate}</span>
                            <span style={{marginLeft: '60px'}}>조회수 {post.view}</span>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </ul>
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


