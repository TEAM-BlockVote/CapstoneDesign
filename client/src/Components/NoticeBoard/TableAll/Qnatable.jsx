import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Qnatable.css';
import axios from 'axios';
import WritingForm from '../WriteAll/WritingForm';

function Qnatable() {
  const [showWritingForm, setShowWritingForm] = useState(false);
  const navigate = useNavigate();
  const [tableposts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null); // 선택된 후보자 상태 추가
  const categoriesRef = useRef([]);

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
      setIsLoading(false);
    } catch (error) {
      console.error('게시물을 불러오는 데 실패했습니다.', error);
    }
  };

  const handleWriteClick = () => {
    setShowWritingForm(true);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const addPostToTable = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedCandidate(null); // 카테고리 변경 시 후보자 선택 초기화
  };
  
  const handleCandidateClick = (candidateName) => {
    setSelectedCandidate(candidateName);
  };

  return (
    <>
      {isLoading ? (
        <p>게시물을 불러오는 중입니다...</p>
      ) : showWritingForm ? (
        <WritingForm
          addPostToTable={addPostToTable}
          handleFormCancel={() => setShowWritingForm(false)}
        />
      ) : (
        <>
          <div className="categories">
            {tableposts.reduce((categories, post) => {
              if (!categories.includes(post.voteName)) {
                categories.push(post.voteName);
              }
              return categories;
            }, []).map((categoryName, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(categoryName)}
                className={`category-button ${selectedCategory === categoryName ? 'active' : ''}`}
              >
                {categoryName}
              </button>
            ))}
          </div>
          <div className="candidate-tabs">
            {selectedCategory !== null &&
              tableposts
                .filter((post) => post.voteName === selectedCategory)
                .reduce((candidates, post) => {
                  if (!candidates.includes(post.candidate)) {
                    candidates.push(post.candidate);
                  }
                  return candidates;
                }, [])
                .map((candidate, index) => (
                  <button
                    key={index}
                    onClick={() => handleCandidateClick(candidate)}
                    className={`candidate-tab-button ${selectedCandidate === candidate ? 'active' : ''}`}
                  >
                    후보자 {candidate}
                  </button>
                ))}
          </div>
          <div className="qna-container">
            {selectedCategory !== null && selectedCandidate !== null && (
                <div ref={(element) => (categoriesRef.current[selectedCategory] = element)}>
                  <h2>{selectedCategory}</h2>
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
                      {tableposts
                        .filter((post) => post.voteName === selectedCategory && post.candidate === selectedCandidate)
                        .map((post, index) => (
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
              )}
                        </div>
          <div className="write-button-container">
            <button onClick={() => setShowWritingForm(!showWritingForm)} className="btn btn-default btn-write">
              글 작성하기
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Qnatable;
