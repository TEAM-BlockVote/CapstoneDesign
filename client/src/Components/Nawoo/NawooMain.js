import React from 'react';
import "./NawooMain.css";

function NawooMain({ onFormClick, voteList }) {
  return (
    <div className='nawoo_form' onClick={onFormClick}>
      <div className='nawoo_top'>
        <div className='nawoo_logo'>
          내가 원하는 후보상은?<br />
          나만의 후보찾기
        </div>
      </div>
      <div className='nawoo_middle'>
        <div className='vote-list'>
          <h2>투표 가능한 목록</h2>
          <ul>
            {voteList.map((vote) => (
              <li key={vote.voteCode}>
                {vote.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='nawoo_bottom'>
        <div className='nawoo_logo'>
          <button>다음</button>
        </div>
      </div>
    </div>
  );
}

export default NawooMain;