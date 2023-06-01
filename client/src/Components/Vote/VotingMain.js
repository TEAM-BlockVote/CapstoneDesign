import React, { useState, useEffect } from 'react';
import { candidatesData }  from './candidatesData';
import './VotingMain.css';

const VotingMain = () => {
  const [opacityStyleState, setOpacityStyleState] = useState(Array(candidatesData.length).fill(true));
  const [displayStyleState, setDisplayStyleState] = useState(Array(candidatesData.length).fill(false));
  
  const [remainingTime, setRemainingTime] = useState(4323);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (time) => {
    const days = Math.floor(time / 86400);
    const hours = Math.floor((time % 86400) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${days}일 ${hours.toString().padStart(2, '0')}시 ${minutes.toString().padStart(2, '0')}분 ${seconds.toString().padStart(2, '0')}초`;
  };
  const handleChangeOpacity = (index) => {
    setOpacityStyleState(prevStates => {
      const newState = prevStates.map((state, i) => i === index)
      return newState;
    });
    setDisplayStyleState(prevStates => {
      const newState = prevStates.map((state, i) => i === index);
      return newState;
    })
  };
  return (
    <>
      <div className='voting_wrapper'>
        <div className='voting_main'>
          <div className='voting_title'>
            <span>2023 서일대학교 총학생회 투표 </span>
          </div>
          <div style={{display: 'flex', marginBottom: '3%', textAlign: 'left'}}>
            <div style={{marginRight: '10%'}}>
              <span style={{color: '#a5a5a5'}}>투표수</span> <span style={{display: 'block', fontSize: '30px'}}> 1,323표 </span>
            </div>
            <div>
              <span style={{color: '#a5a5a5'}}>남은 시간</span> <span style={{display: 'block', fontSize: '30px'}}> {formatTime(remainingTime)} </span>
            </div>
          </div>
          <div>
            <ul className="candidate_start" style={{cursor: 'pointer'}}>
              {candidatesData.map((element, index) => (
                <div>
                <li
                  key={index} className='vote-candidate-list'
                  style={{ opacity: opacityStyleState[index] ? 1 : 0.3}}
                  onClick={() => { handleChangeOpacity(index) }}
                >
                  <div>
                    <div>
                      <img src={element.img} alt='googleimg' className='list_img'/>
                    </div>
                    <div className='candidate_info'>
                      <span className='candidate_num'> {element.partyNumber} </span>
                      <div className='candidate_title'>
                        <strong className='party_name' > {element.partyName} </strong>
                        <h4 className='candidates_name' >{element.candidatesName}</h4>
                      </div>
                    </div>
                    <div>
                      <span className='vote_percent'> {element.votePercent} </span>
                      <span> {element.voteCount}표</span>
                      <div className='graph'>
                        <p style={{width: element.votePercent, height: '3px', background: '#767edb'}}></p>
                      </div>
                    </div>
                  </div>
                </li>
                <div style={{backgroundColor: '#f2f2f2', display: displayStyleState[index] ? '' : 'none'}}>
                  {element.promise.map((ele, index) => (
                    <span style={{display: 'block'}} key={index}>{ele}</span>
                  ))}
                </div>
                </div>
              ))}
            </ul>
            <button> 투표하기 </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VotingMain;
