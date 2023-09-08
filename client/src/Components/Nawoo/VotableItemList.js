import React from 'react';
import "./VotableItemList.css";

function VotableItemList({voteList, categories}) {
  const testFunc = () => {console.log("1");}
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
            <div key={index} style={{height: '100px', width: '100%'}} onClick={testFunc}>
              {vote.title}
            </div>
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