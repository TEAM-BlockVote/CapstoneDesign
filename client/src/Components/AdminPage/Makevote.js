import React, { useState } from 'react';
import "./Makevote.css";
import Viewvote from './Viewvote';
import VotePlus from './VotePlus';

function Makevote({ notices, setNotices }) {


  const [voteComponents, setVoteComponents] = useState([<VotePlus />]);

  const addVoteComponent = () => {
    setVoteComponents([...voteComponents, <VotePlus />]);
  };

  const handleRegister = () => {
    const title = document.getElementsByName("title")[0].value;
    const vote_type = document.getElementsByName("vote_type")[0].value;
    const start_date = document.getElementsByName('start_date')[0].value;
    const end_date = document.getElementsByName('end_date')[0].value;
    setNotices(...notices, [{ title, vote_type, start_date, end_date }]);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <h1>투표 만들기</h1>
          <hr />
          <div>
            <div className="form-group">
              <label htmlFor="subject">투표 제목</label><br />
              <input type="text" className="form-control2 col-12" name="title"  />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="vote_type">투표 유형:</label><br />
              <select className="form-control2 col-12 require" name="vote_type" required>
                <option value="">투표 유형 선택</option>
                <option value="찬반 투표">찬반 투표</option>
                <option value="선택 투표">선택 투표</option>
              </select>
            </div>
            <br />
            <div className='form-group'>
              <label htmlFor="vote_date">투표 기간</label><br />
              <input type='date' name='start_date'></input>
              -
              <input type='date' name='end_date'></input>
            </div>
            <br />
            <div>
              {voteComponents.map((component, index) => (
                <div key={index}>{component}</div>
              ))}
              <button type="button" className="btn btn-secondary btn-lg float-right" onClick={addVoteComponent}>
                후보자 추가
              </button>
            </div>
            <br />
            <div className='text-center'>
              <button type="button" className="btn btn-dark btn-lg btn-block col-1" onClick={handleRegister}>등록</button>
            </div>
          </div>
          {notices.map((notice, index) => (
            <Viewvote key={index} title={notice.title} vote_type={notice.vote_type} start_date={notice.start_date} end_date={notice.end_date} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Makevote;