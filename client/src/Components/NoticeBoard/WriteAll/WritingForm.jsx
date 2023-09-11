import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WritingForm.css';
import axios from 'axios';

function WritingForm({ addPostToTable, selectedVoteTitle }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [isPostSubmitted, setIsPostSubmitted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(''); // 후보자 선택 상태 추가
  const [candidates, setCandidates] = useState([]); // 후보자 목록을 관리하기 위한 상태

  useEffect(() => {
    fetchCandidates(selectedVoteTitle);
  }, [selectedVoteTitle]);

  const fetchCandidates = async (selectedVoteTitle) => {
    try {
      const response = await axios.get(`board/candidates/${selectedVoteTitle}`);
      if (response.status === 200) {
        setCandidates(response.data.candidates);
      } else {
        console.error('후보자 목록을 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('후보자 목록을 불러오는 데 실패했습니다.', error);
    }
  };
  

  const handleCandidateChange = (event) => {
    setSelectedCandidate(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (title === '') {
      alert('제목을 입력해주세요.');
      return;
    }
    if (content === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    if (selectedCandidate === '') {
      alert('후보자를 선택해주세요.');
      return;
    }

    console.log('Selected Candidate:', selectedCandidate);
   
    const newPost = {
      title: title,
      content: content,
      voteTitle: selectedVoteTitle, 
      candidate: selectedCandidate,
    };
    

    console.log('New Post Object:', newPost);

    try {
      const response = await axios.post('/board/qnaposts', newPost);

      if (response.status === 200) {
        alert('글 작성이 완료되었습니다.');
        setTitle('');
        setContent('');
        setSelectedCandidate(''); // 글 작성 완료 후 후보자 선택 초기화
        setIsPostSubmitted(true);
        addPostToTable(newPost);
      }
    } catch (error) {
      console.error('글 작성 중 오류가 발생했습니다.', error);
      alert('글 작성 중 오류가 발생했습니다.');
    }
  };

  const showTableComponent = () => {
    setIsPostSubmitted(false);
    addPostToTable();
  };

  return (
    <>
      {isPostSubmitted ? null : (
        <form className="qna-write-form__container" onSubmit={handleFormSubmit}>
          <div className="qna-write-form__label">
            <label htmlFor="qna-form__title">제목:</label>
            <input
              id="qna-form__title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="qna-form__input"
            />
          </div>
          <div className="qna-write-form__label">
            <label htmlFor="qna-form__content">내용:</label>
            <textarea
              id="qna-form__content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="qna-write-form__textarea"
            />
          </div>
          <div className="qna-write-form__label">
            <label htmlFor="qna-form__vote">투표:</label>
            <select
              id="qna-form__vote"
              value={selectedVoteTitle}
              className="qna-form__input"
            >
              <option value={selectedVoteTitle}>{selectedVoteTitle}</option>
            </select>
          </div>
          <div className="qna-write-form__label">
              <label htmlFor="qna-form__candidate">후보자:</label>
              <select
                id="qna-form__candidate"
                value={selectedCandidate}
                onChange={handleCandidateChange}
                className="qna-form__input"
              >
                <option value="">후보자를 선택하세요</option>
                {candidates.map((candidate) => (
                  <option key={candidate} value={candidate}>
                    {candidate}
                  </option>
                ))}
              </select>
            </div>
          <button type="submit" className="qna-write-form__button">
            작성완료
          </button>
        </form>
      )}

      {isPostSubmitted && showTableComponent()}
    </>
  );
}

export default WritingForm;
