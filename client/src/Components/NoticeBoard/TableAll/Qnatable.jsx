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
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8); // 페이지당 게시물 수를 8로 설정
  const categoriesRef = useRef([]);
  const [selectedVoteTitle, setSelectedVoteTitle] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  // 클라이언트 측 코드에서 fetchPosts 함수 수정
const fetchPosts = async () => {
  try {
    const response = await axios.get(`/board/qnaposts?page=${currentPage}`); // 페이지 번호를 추가하여 요청
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

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedCandidate(null);
    const selectedVote = tableposts.find(post => post.voteName === categoryName);
    setSelectedVoteTitle(selectedVote ? selectedVote.voteName : '');
    setCurrentPage(1); // 카테고리 변경 시 현재 페이지를 1로 리셋
    setShowWritingForm(false);
  };

  const handleCandidateClick = (candidateName) => {
    setSelectedCandidate(candidateName);
  };

  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return tableposts
      .filter((post) => post.voteName === selectedCategory && post.candidate === selectedCandidate)
      .slice(startIndex, endIndex);
  };

  return (
    <>
      {isLoading ? (
        <p>게시물을 불러오는 중입니다...</p>
      ) : showWritingForm ? (
        <WritingForm
          addPostToTable={addPostToTable}
          handleFormCancel={() => setShowWritingForm(false)}
          selectedVoteTitle={selectedVoteTitle}
          setSelectedVoteTitle={setSelectedVoteTitle} 
        />
      ) : (
        <>
          {!showWritingForm && (
            <div>
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
            </div>
          )}
          {!showWritingForm && (
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
              )}
            </div>
          )}
          <div className="write-button-container">
            {!showWritingForm && selectedCategory !== null && (
              <button onClick={handleWriteClick} className="btn btn-default btn-write">
                글 작성하기
              </button>
            )}
          </div>
          {showWritingForm && (
            <WritingForm
              addPostToTable={addPostToTable}
              selectedVoteTitle={selectedVoteTitle}
            />
          )}
        </>
      )}
    </>
  );
}

export default Qnatable;
