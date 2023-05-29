import React, { useState } from 'react';
import './WritingForm.css';

function WritingForm({ addPostToTable, postCount, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [promiseIndex, setPromiseIndex] = useState(0);
  
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

  const handleCandidateChange = (e) => {
    setCandidateIndex(e.target.value);
  };

  const handlePromiseChange = (e) => {
    setPromiseIndex(e.target.value);
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (title === '') {
      alert('제목을 입력해주세요.'); // 제목이 비어 있는 경우 알림 창 표시
      return;
    }
    if (content === '') {
      alert('내용을 입력해주세요.'); // 내용이 비어 있는 경우 알림 창 표시
      return;
    }

    const newPost = {
      no: postCount + 1,
      title: title,
      name: '작성자',
      date: new Date().toLocaleDateString(),
      view: 0,
      content: content,
    };

    addPostToTable(newPost);

    setTitle('');
    setContent('');
  };

  const handleFormCancel = () => {
    setTitle('');
    setContent('');
    onCancel();
  };

  return (
    <>
      <form className="qna-write-form__container" onSubmit={handleFormSubmit}>
        <div className="qna-write-form__label">
          <label htmlFor="title">제목:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="qna-form__input"
          />
        </div>
        <div className="qna-write-form__label">
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="qna-write-form__textarea"
          />
        </div>
        <button type="submit" className="qna-write-form__button">
          작성완료
        </button>
      </form>
    </>
  );
}

export default WritingForm;
