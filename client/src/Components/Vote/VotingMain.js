import React, { useState, useEffect } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import Loding from '../Main/Loding';
import './VotingMain.css';
import axios from 'axios';

const VotingMain = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const voteCode = urlParams.get('voteCode');
  const [voteInfo, setVoteInfo] = useState('');
  const [candidates, setCandidates] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);  
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [opacityStyleState, setOpacityStyleState] = useState(null);
  const [displayStyleState, setDisplayStyleState] = useState(null);

  const [showVotingModal, setShowVotingModal] = useState(false);
  const handleVotingModalClose = () => setShowVotingModal(false);
  const handleVotingModalShow = () => setShowVotingModal(true);
  
  const [remainingTime, setRemainingTime] = useState();

  useEffect(() => {
    if (!isLoading) {
      handleTimeDifference();
    }
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1000;
        }  
        return prevTime;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [isLoading]);

  const formatTime = (time) => {
    let seconds = time / 1000;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    seconds %= 60;
    minutes %= 60;  
    hours %= 24;

    return `${days}일 ${hours.toString().padStart(2, '0')}시 ${minutes.toString().padStart(2, '0')}분 ${seconds.toString().padStart(2, '0')}초`;
  };

  const handleChangeOpacity = (index) => {
    setSelectedCandidate(index);
    setOpacityStyleState(prevStates => {
      const newState = prevStates.map((state, i) => i === index)
      return newState;
    });
    setDisplayStyleState(prevStates => {
      const newState = prevStates.map((state, i) => i === index);
      return newState;
    })
  };

  const handleVotingSubmit = () => {

    if (selectedCandidate !== null) {
      // console.log("고름");
      setSelectedCandidate(selectedCandidate);
      handleVotingModalShow();
    } else {
      // console.log("안고름");
      alert("후보를 골라주세요");
      setSelectedCandidate(null);
    }
  }

  useEffect(() => {
    axios.get(`/vote/${voteCode}`)
    .then((res) => {
      const votes = res.data.candidatesInfo.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.votes;
      }, 0);
      setTotalVotes(votes);
      setVoteInfo(res.data.voteInfo);
      setCandidates(res.data.candidatesInfo);
      setOpacityStyleState(Array(res.data.candidatesInfo.length).fill(true)); 
      setDisplayStyleState(Array(res.data.candidatesInfo.length).fill(false));
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err + "투표 데이터를 가지고 올 수 없음.");
    });
  }, [voteCode]);

  const handleFormSubmit = (e) => {
    console.log(selectedCandidate);
    e.preventDefault();
    const res = axios.post(`/vote/voting`, {
      "selectedCandidatedata": selectedCandidate, //기호 1번은 인덱스 0으로 데이터를 보냅니다..
      "voteCode": voteCode,
    });
    if (res.status === 200) {
      handleVotingModalClose()
      alert('투표 완료!');
    } else {
      alert("투표 실패");
      handleVotingModalClose()
    }
  };

  const handleTimeDifference = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const currentTime = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
    const endTime = new Date(voteInfo[0].endDate + 'T18:00:00');
    const timeDifference = endTime - currentTime;
    setRemainingTime(timeDifference);
  }

  if(!voteInfo && !candidates) {
    return <Loding/>
  }

  return (
    <div className='voting_wrapper'>
      <div className='voting_main'>
        { voteInfo.map((element, index) => (
          <div key={index}>
            <div className='voting_title'>
              <span>{element.title} </span>
            </div>
            <div style={{display: 'flex', marginBottom: '3%', textAlign: 'left'}}>
              <div style={{marginRight: '10%'}}>
                <span style={{color: '#a5a5a5'}}>투표수</span> <span style={{display: 'block', fontSize: '30px'}}> {totalVotes}표 </span>
              </div>
              <div>
                <span style={{color: '#a5a5a5'}}>남은 시간</span> <span style={{display: 'block', fontSize: '30px'}}> {formatTime(remainingTime)} </span>
              </div>
            </div>
          </div>
        ))}
        <div>
          <ul className="candidate_start" style={{cursor: 'pointer'}}>
            {candidates.map((element, index) => (
              <form key={index}>
                <li
                  className='vote-candidate-list'
                  style={{ opacity: opacityStyleState[index] ? 1 : 0.3}}
                  onClick={() => { handleChangeOpacity(index) }}
                >
                  <div>
                    <div>
                      <img src={element.partyimage} alt='후보자 사진' className='list_img'/>
                    </div>
                    <div className='candidate_info'>
                      <span className='candidate_num'> {element.partyNumber} </span>
                      <div className='candidate_title'>
                        <strong className='party_name' > {element.partyName} </strong>
                        <h4 className='candidates_name' >{element.candidateName}</h4>
                      </div>
                    </div>
                    <div>
                      <span className='vote_percent'> { element.votes === 0 ? '0%' : `${ (element.votes / totalVotes * 100).toFixed(2)}%` } </span>
                      <span> {element.votes}표 </span>
                      <div className='graph'>
                        <p style={{width: `${element.votes}` === 0 ? '0%' : `${(element.votes / totalVotes * 100).toFixed(2)}%` , height: '3px', background: '#767edb'}}></p>
                      </div>
                    </div>
                  </div>
                </li>
              </form>
            ))}
          </ul>
          <button onClick={handleVotingSubmit}> 투표하기 </button>
        </div>
      </div>
      <Modal show={showVotingModal} onHide={handleVotingModalClose} centered style={{textAlign: 'center'}}>
        <Modal.Header style={{ borderBottom: 'rgb(222,222,222)' }}>
          <CloseButton onClick={handleVotingModalClose} />
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div>
              {candidates[selectedCandidate] && 
                <div>
                  <div> 기호 {candidates[selectedCandidate].partyNumber} 번 </div>
                  <div> {candidates[selectedCandidate].partyName} 팀 </div>
                  <div> {candidates[selectedCandidate].candidateName} 후보</div> 
                  <div> 선택하신 후보가 맞습니까? </div> 
                </div>
              }
              <button className='candidate-info-modal' type='submit' style={{backgroundColor: '#fb7e75'}}>
                예(투표)
              </button>
              <button type='button' className='candidate-info-modal' onClick={handleVotingModalClose}>
                아닙니다(취소)
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VotingMain;
