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

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/auth/qnaposts');
      if (response.status === 200) {
        setPosts(response.data.tableposts);
      } else {
        console.error('게시물을 불러오는 데 실패했습니다.');
      }
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

  const handleFormCancel = () => {
    setShowWritingForm(false);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleClick = (page) => {
    setActivePage(page);
    // 페이지 변경에 대한 로직 추가
  };

  return (
    <>
      {!showWritingForm && (
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
          {tableposts.map((post, index) => (
            <tr key={post.id}>
              <td>{index + 1}</td>
              <td>
              <Link to={`/post/${post.id}`} onClick={() => handlePostClick(post.id)}>
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
      )}
      {showWritingForm ? (
        <WritingForm addPostToTable={addPostToTable} />
      ) : (
        <>
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
