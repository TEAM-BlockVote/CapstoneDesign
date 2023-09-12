import React from 'react';
import { Link } from "react-router-dom";
import "./VotableItemList.css";

function VotableItemList({voteList}) {
  return (
    <div className='nawoo_form'>
      <div className='nawoo_top'>
        <div className='nawoo_logo'>
          내가 원하는 후보상은?<br />
          나만의 후보찾기
        </div>
      </div>
      <div className='nawoo_middle'>
        <h2>투표 가능한 목록</h2>
        <div className='vote-list'>  
          {voteList.map((vote, index) => (
            <Link to={`CategorySelect/${voteList[index].voteCode}`} key={index}>
              <div style={{height: '100px', width: '100%'}}>
                {vote.title}
              </div>
            </Link>
          ))}
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

export default VotableItemList;