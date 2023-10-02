import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WritingForm.css';
import axios from 'axios';

function WritingForm({ addPostToTable, candidateData, setShowWritingForm }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPostSubmitted, setIsPostSubmitted] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [selectedCandidateObject, setSelectedCandidateObject] = useState([]);
  const [selectedPromise, setSelectedPromise] = useState('');

  const handleCandidateChange = (event) => {
    if(event.target.value === '') {
      setSelectedCandidate('');
      setSelectedOption1('');
      setSelectedPromise('');
    } else {
      const selectedCandidate = candidateData.find(candidate => candidate.candidateName === event.target.value);
      setSelectedCandidate(selectedCandidate.candidateName);
      setSelectedCandidateObject(selectedCandidate);
      setSelectedOption1(event.target.value);
      setSelectedPromise('');
    }
  };

  const handlePromiseChange = (event) => {
    setSelectedPromise(event.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (title === '') {
      alert('제목을 입력해주세요.');
      return;
    }
    if (selectedCandidate === '') {
      alert('후보자를 선택해주세요.');
      return;
    }
    if (selectedPromise === '') {
      alert('공약을 선택해주세요.');
      return;
    }
    if (content === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    
    const newPost = {
      voteCode: selectedCandidateObject.voteCode,
      title: title,
      content: content,
      candidate: selectedCandidate,
      promise: selectedPromise
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
              <label htmlFor="qna-form__candidate">후보자:</label>
              <select
                id="qna-form__candidate"
                value={selectedCandidate}
                onChange={handleCandidateChange}
                className="qna-form__input"
              >
                <option value="">후보자를 선택하세요</option>
                {candidateData.map((candidate, index) => (
                  <option key={index} value={candidate.candidateName}>
                    {candidate.candidateName}
                  </option>
                ))}
              </select>
            </div>

            {selectedCandidate && (
              <div className="qna-write-form__label">
                <label htmlFor="qna-form__promise">공약:</label>
                <select
                  id="qna-form__promise"
                  value={selectedPromise}
                  onChange={handlePromiseChange}
                  className="qna-form__input"
                  disabled={selectedOption1 === ''}
                >
                  <option value="">공약를 선택하세요</option>
                  {selectedCandidateObject.promise.map((promise, index) => (
                    <option key={index} value={promise}>
                      {promise}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
            <button className="qna-write-form__button qna-cancel-button" onClick={() => {setShowWritingForm(false)}}>
              작성취소
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default WritingForm;
