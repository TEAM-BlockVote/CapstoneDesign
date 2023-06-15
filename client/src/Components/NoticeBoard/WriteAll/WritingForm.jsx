import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WritingForm.css';
import axios from 'axios';

function WritingForm({ addPostToTable, handleFormCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [promiseIndex, setPromiseIndex] = useState(0);
  const [isPostSubmitted, setIsPostSubmitted] = useState(false); 

  const candidates = [
    "후보자 1",
    "후보자 2",
    "후보자 3"
  ];

  const promises = [
    [
      "1번 공약: 더 좋은 대학교를 만들겠습니다.",
      "2번 공약: 더 많은 일자리를 창출하겠습니다.",
      "3번 공약: 교통체증 문제를 해결하겠습니다."
    ],
    [
      "1번 공약: 환경 보호를 위해 노력하겠습니다.",
      "2번 공약: 교육 개혁을 추진하겠습니다.",
      "3번 공약: 복지 제도를 강화하겠습니다."
    ],
    [
      "1번 공약: 더 나은 병원을 만들겠습니다.",
      "2번 공약: 소득 격차를 해소하겠습니다.",
      "3번 공약: 주택 가격 안정을 위해 노력하겠습니다."
    ]
  ];

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

    const newPost = {
      title: title,
      content: content,
    };

    try {
      const response = await axios.post('/board/qnaposts', newPost);

      if (response.status === 200) {
        alert('글 작성이 완료되었습니다.');
        setTitle('');
        setContent('');
        setIsPostSubmitted(true);
        addPostToTable(newPost); 
        window.location.reload();
      
      } else {
        alert('글 작성 중 오류가 발생했습니다.');
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
        <form className="qna-write-form__container" onSubmit={handleFormSubmit} >
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
          <button type="submit" className="qna-write-form__button">작성완료</button>
        </form>
      )}
  
      {isPostSubmitted && showTableComponent()}
    </>
  );
  
}

export default WritingForm;