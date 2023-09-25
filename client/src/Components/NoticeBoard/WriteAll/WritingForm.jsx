import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WritingForm.css';
import axios from 'axios';

function WritingForm({ addPostToTable, selectedVoteTitle, candidateData }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [isPostSubmitted, setIsPostSubmitted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState('');

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

    const newPost = {
      title: title,
      content: content,
      voteTitle: selectedVoteTitle,
      candidate: selectedCandidate,
    };

    try {
      const response = await axios.post('/board/qnaposts', newPost);

      if (response.status === 200) {
        alert('글 작성이 완료되었습니다.');
        setTitle('');
        setContent('');
        setSelectedCandidate('');
        setIsPostSubmitted(true);
        addPostToTable(newPost);
        window.location.reload();
      }
    } catch (error) {
      console.error('글 작성  오류가 발생했습니다.', error);
      alert('글 작성 중 오류가 발생했습니다.');
    }
  };

  const handleCancelClick = () => {
    // 작성 취소 버튼 클릭 시 페이지를 새로고침
    window.location.reload();
  };

  return (
    <div className="parent-container">
      <div className="qna-write-form__container">
        {isPostSubmitted ? null : (
          <form onSubmit={handleFormSubmit}>
            <div className="qna-write-form__label">
              <label htmlFor="qna-form__title">제목:</label>
              <input
                id="qna-form__title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="qna-form__input"
                placeholder="제목을 입력하세요"
              />
            </div>
            <div className="qna-write-form__label">
              <label htmlFor="qna-form__vote">투표:</label>
              <select
                id="qna-form__vote"
                value={selectedVoteTitle}
                className="qna-form__input"
                readOnly
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
                {candidateData.map((candidate) => (
                  <option key={candidate.id} value={candidate.candidateName}>
                    {candidate.candidateName}
                  </option>
                ))}
              </select>
            </div>
            <div className="qna-write-form__label">
              <label htmlFor="qna-form__content">내용:</label>
              <textarea
                id="qna-form__content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="qna-write-form__textarea"
                placeholder="내용을 입력하세요"
              />
            </div>
            <button type="submit" className="qna-write-form__button">
              작성완료
            </button>
            <button
              type="button"
              className="qna-write-form__button qna-cancel-button"
              onClick={handleCancelClick}
            >
              작성취소
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default WritingForm;
