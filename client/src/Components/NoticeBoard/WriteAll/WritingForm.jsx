import React, { useState } from 'react';
import "./WritingForm.css";

function WritingForm() {
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
  }

  const handlePromiseChange = (e) => {
    setPromiseIndex(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
  }

  return (
   <> 
    <form className="qna-write-form__container" onSubmit={handleFormSubmit}>
        <div className="qna-write-form__label">
        <label htmlFor="candidate-select">후보자:</label>
        <select id="candidate-select" value={candidateIndex} onChange={handleCandidateChange}>
          {candidates.map((candidate, index) => (
            <option key={index} value={index}>{candidate}</option>
          ))}
        </select>
      </div>
      <div className="qna-write-form__label">
        <label htmlFor="promise-select">공약:</label>
        <select id="promise-select" value={promiseIndex} onChange={handlePromiseChange}>
          {promises[candidateIndex].map((promise, index) => (
            <option key={index} value={index}>{promise}</option>
          ))}
        </select>
      </div>
   
      <div className="qna-write-form__label">
        <label htmlFor="title">제목:</label>
        <input id="title" type="text" className="qna-form__input" />
      </div>
      <br />
      <div className="qna-write-form__label">
        <label htmlFor="content">내용:</label>
        <textarea id="content" className="qna-write-form__textarea" />
        </div>
      
      <button type="submit" className="qna-write-form__button">작성 완료</button>
    </form>
 
    </>
  );
}

export default WritingForm;
