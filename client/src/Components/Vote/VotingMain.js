import React, { useState, useEffect } from 'react';
import { candidatesData }  from './candidatesData';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import './VotingMain.css';
import axios from 'axios';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';

const VotingMain = () => {
  const imgArr = [img1, img2, img3, img4];
  const urlParams = new URLSearchParams(window.location.search);
  const voteCode = urlParams.get('voteCode');
  
  const [voteInfo, setVoteInfo] = useState('');
  const [candidates, setCandidates] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [opacityStyleState, setOpacityStyleState] = useState(Array(4).fill(true)); //하드코딩 바꿔야함
  const [displayStyleState, setDisplayStyleState] = useState(Array(4).fill(false)); //하드코딩 바꿔야함

  const [showVotingModal, setShowVotingModal] = useState(false);
  const handleVotingModalClose = () => setShowVotingModal(false);
  const handleVotingModalShow = () => setShowVotingModal(true);
  
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

  const handleVotingSubmit = () => {
    const index = displayStyleState.findIndex(ele => ele === true);
    if (index !== -1) {
      // console.log("고름");
      setSelectedCandidate(index);
      handleVotingModalShow();
    } else {
      // console.log("안고름");
      setSelectedCandidate(null);
    }
  }

  const handleVotesUpdate = () => {
    const totalVotes = candidates.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.votes;
    }, 0);

    setTotalVotes(totalVotes);
  }

  useEffect(() => {
    axios.get(`/vote/${voteCode}`)
    .then((res) => {
      setVoteInfo(res.data.hasVoteInfo);
      setCandidates(res.data.candidates);
      handleVotesUpdate();
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 404) {
          alert(err.response.data.error);
          window.location.href = "/";
        } else {
          console.log("서버 에러");
        }
      } else {
        console.log("네트워크 에러");
      }
    });
  }, [voteCode, candidates]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`/vote/voting`, {
      "selectedCandidatedata": selectedCandidate,
      "voteCode": voteCode,
    });
    if (res.status === 200) {
      handleVotingModalClose()
      alert('투표 완료!');
    } else {
      handleVotingModalClose()
    }
    console.log();
  };

  if (!candidates) {
    return <div>데이터 로딩중...</div>;
  }

  return (
    <>
      <div className='voting_wrapper'>
        <div className='voting_main'>
          {voteInfo.map((element, index) => (
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
                      <img src={imgArr[element.id-1]} alt='googleimg' className='list_img'/>
                    </div>
                    <div className='candidate_info'>
                      <span className='candidate_num'> {element.id} </span>
                      <div className='candidate_title'>
                        <strong className='party_name' > {element.party} </strong>
                        <h4 className='candidates_name' >{element.candidate}</h4>
                      </div>
                    </div>
                    <div>
                      <span className='vote_percent'> "10%" </span>
                      <span> {element.votes}표</span>
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
                </form>
              ))}
            </ul>
            <button onClick={handleVotingSubmit}> 투표하기 </button>
          </div>
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
              <div>{candidates[selectedCandidate].id} 번 </div>
              <div>{candidates[selectedCandidate].party} 팀 </div>
              <div> {candidates[selectedCandidate].candidate} 후보</div> 
              <div> 선택하신 후보자가 맞습니까? </div> 
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
    </>
  );
};

export default VotingMain;
