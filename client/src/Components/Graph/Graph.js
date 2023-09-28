import { useState, useEffect } from 'react';
import MakeVote from '../Main/images/makeVote.png';

import './Graph.css';
const Graph = () => {
  return (
    <div className='graph-wrap'>
      <div className='graph-header' >
        <h1>Test</h1>
      </div>
      <div className='graph-container' >
        <div>
          <img src={MakeVote} alt='img'/>
          <p>실시간 투표율</p>
        </div>
        <div>
          <img src={MakeVote} alt='img'/>
          <p>실시간 투표자수</p>
        </div>
        <div>
          <img src={MakeVote} alt='img'/>
          <p>남은 시간</p>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Graph;