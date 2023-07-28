
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Qnatable.css';
import axios from 'axios';
import WritingForm from '../WriteAll/WritingForm';

function Qnatable() {
  const [showWritingForm, setShowWritingForm] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const [tableposts, setPosts] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null); // 추가된 부분: 선택된 후보자를 저장하는 상태
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/board/qnaposts');
      if (response.status === 200) {
        setPosts(response.data.tableposts);
      } else {
        console.error('게시물을 불러오는 데 실패했습니다.');
      }
      setIsLoading(false); // 데이터 로딩이 완료되었음을 표시
    } catch (error) {
      console.error('게시물을 불러오는 데 실패했습니다.', error);
    }
  };

  const addPostToTable = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const handleWriteClick = () => {
    setShowWritingForm(true);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleClick = (page) => {
    setActivePage(page);
    // 페이지 변경에 대한 로직 추가
  };
 


const handleCandidateClick = async (candidateNumber) => {
  setSelectedCandidate(candidateNumber);

  try {
    const response = await axios.get(`/board/qnaposts/candidate/${candidateNumber}`);
    if (response.status === 200) {
      setPosts(response.data.tableposts);
    } else {
      console.error('게시물을 불러오는 데 실패했습니다.');
    }
  } catch (error) {
    console.error('게시물을 불러오는 데 실패했습니다.', error);
  }
};


return (
  <>
    {isLoading ? (
      // 데이터 로딩 중일 때 표시될 메시지
      <p>게시물을 불러오는 중입니다...</p>
    ) : showWritingForm ? (
      // 글 작성 폼 표시
      <WritingForm addPostToTable={addPostToTable} />
    ) : (
      <>
        <div className="candidate-tabs">
          <button className={`candidate-tab-button ${selectedCandidate === 1 ? 'active' : ''}`} onClick={() => handleCandidateClick(1)}>후보자 1</button>
          <button className={`candidate-tab-button ${selectedCandidate === 2 ? 'active' : ''}`} onClick={() => handleCandidateClick(2)}>후보자 2</button>
          <button className={`candidate-tab-button ${selectedCandidate === 3 ? 'active' : ''}`} onClick={() => handleCandidateClick(3)}>후보자 3</button>
      </div>
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
            {tableposts && tableposts.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td>
              <Link to={`/post/${post.id}`} onClick={() => handlePostClick(post.id)}  style={{ textDecoration: 'none', color: 'inherit' }}>
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
      <div>
            <button onClick={handleWriteClick} className="btn btn-default btn-write">
              글 작성하기
            </button>
          </div>
          <div className="qna-pageCh">
            <nav aria-label="qna-pageChange">
              <ul className="qna-pagination">
                <li className={`qna-page-item ${activePage === 1 ? "disabled" : ""}`}>
                  <a className="qna-page-link" href="javascript:void(0)" onClick={() => handleClick(activePage - 1)}>
                    Previous
                  </a>
                </li>
                <li className={`qna-page-item ${activePage === 1 ? "active" : ""}`}>
                  <a className="page-link" href="javascript:void(0)" onClick={() => handleClick(1)}>
                    1
                  </a>
                </li>
                <li className={`qna-page-item ${activePage === 3 ? "disabled" : ""}`}>
                  <a className="qna-page-link" href="javascript:void(0)" onClick={() => handleClick(activePage + 1)}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
      </>
    )}
  </>
  );
}

export default Qnatable;






