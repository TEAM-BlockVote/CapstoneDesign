import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WritingForm.css';
import axios from 'axios';

function WritingForm({ addPostToTable, handleFormCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [selectedVote, setSelectedVote] = useState('');
  const [isPostSubmitted, setIsPostSubmitted] = useState(false);
  const [votes, setVotes] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');

  useEffect(() => {
    fetchVotes();
  }, []);

  const fetchVotes = async () => {
    try {
      const response = await axios.get('/board/vote');
      if (response.status === 200) {
        setVotes(response.data);
      } else {
        console.error('투표 정보를 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('투표 정보를 불러오는 데 실패했습니다.', error);
    }
  };

  const handleVoteChange = (event) => {
    setSelectedVote(event.target.value);
    setSelectedCandidate(''); // 투표 변경 시 후보자 선택 초기화
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
    if (selectedVote === '') {
      alert('투표를 선택해주세요.');
      return;
    }
    if (selectedCandidate === '') {
      alert('후보자를 선택해주세요.');
      return;
    }
  
    const selectedVoteObject = votes.find((vote) => vote.voteCode === selectedVote);
  
    if (!selectedVoteObject) {
      console.error('선택한 투표를 찾을 수 없습니다.');
      return;
    }
  
    const newPost = {
      title: title,
      content: content,
      voteCode: selectedVote, // 투표 코드를 서버로 보냄
      candidate: selectedCandidate // 후보자 변수 설정
    };
  
    console.log('New Post Object:', newPost);
  
    try {
      const response = await axios.post('/board/qnaposts', newPost);
  
      if (response.status === 200) {
        alert('글 작성이 완료되었습니다.');
        setTitle('');
        setContent('');
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
              value={selectedVote}
              onChange={handleVoteChange}
              className="qna-form__input"
            >
              <option value="">투표를 선택하세요</option>
              {votes && votes.map((vote) => (
                <option key={vote.voteCode} value={vote.voteCode}>
                  {vote.title}
                </option>
              ))}
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
              {votes &&
                votes.find((vote) => vote.voteCode === selectedVote)?.name ? (
                  <option value={votes.find((vote) => vote.voteCode === selectedVote)?.name}>
                    {votes.find((vote) => vote.voteCode === selectedVote)?.name}
                  </option>
                ) : (
                  <div>후보자가 없습니다.</div>
                )}
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
