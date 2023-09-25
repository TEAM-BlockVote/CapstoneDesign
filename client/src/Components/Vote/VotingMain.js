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

  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const [isPromiseButtonClicked, setIsPromiseButtonClicked] = useState(false);

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

  const handlePromiseButtonClick = () => {
    setIsCategoriesVisible(!isCategoriesVisible);
    setIsPromiseButtonClicked(!isPromiseButtonClicked);
  };

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

  if (!voteInfo && !candidates) {
    return <Loding />
  }

  return (
    <div className='voting_wrapper'>
      <div className='voting_main'>
        <div className='voting_left'>
          {voteInfo.map((element, index) => (
            <div className='voting_left_top' key={index}>
              <div className='voting_title'>
                <span>{element.title} </span>
              </div>
              <div className='voting_total'>
                <div className='voting_count'>
                  <span className='count_span'>투표수</span> <span className='total_span'> {totalVotes}표 </span>
                </div>
                <div className='voting_time'>
                  <span className='count_span'>남은 시간</span> <span className='total_span'> {formatTime(remainingTime)} </span>
                </div>
              </div>
            </div>
          ))}
          <div className='voting_left_middle'>
            <ul className="candidate_start">
              {candidates.map((element, index) => (
                <form key={index}>
                  <li
                    className='vote-candidate-list'
                    style={{ opacity: opacityStyleState[index] ? 1 : 0.3 }}
                    onClick={() => { handleChangeOpacity(index) }}
                  >
                    <div className='candidate_margin'>
                      <div>
                        <img src={element.partyimage} alt='후보자 사진' className='list_img' />
                      </div>
                      <div className='candidate_info'>
                        <div className='info_top'>
                          <div className='candidate_num'>
                            <span>{element.partyNumber}</span>
                          </div>
                          <div className='candidate_title'>
                            <strong className='party_name' > {element.partyName} </strong>
                          </div>
                        </div>
                        <div className='info_bottom'>
                          <h4 className='candidates_name' >{element.candidateName}</h4>
                        </div>
                      </div>
                      <div>
                        <span className='vote_percent'> {element.votes === 0 ? '0%' : `${(element.votes / totalVotes * 100).toFixed(2)}%`} </span>
                        <span style={{fontWeight:'bold'}}> {element.votes}표 </span>
                        <div className='graph'>
                          <p style={{ width: `${element.votes}` === 0 ? '0%' : `${(element.votes / totalVotes * 100).toFixed(2)}%`, height: '5px', background: '#767edb' }}></p>
                        </div>
                      </div>
                      <div className='voting_promise'>
                        <p>통학 버스 운행 시간 연장</p>
                        <p>학생 식당 메뉴 추가</p>
                        <p>교수 온라인 상담</p>
                      </div>
                    </div>
                  </li>
                </form>
              ))}
            </ul>
          </div>
          <div className='voting_left_bottom'>
            <button className='vote_button' onClick={handleVotingSubmit}> 투표하기 </button>
          </div>
        </div>
        <div className='voting_right'>
          <div className='voting_right_top'>
            <div className='voting_right_title'>
              <span className='promise_title'>공약 카테고리</span>
              <button className={`promise_button ${isPromiseButtonClicked ? 'clicked' : ''}`} onClick={handlePromiseButtonClick}>공약</button>
            </div>
            <div className={`categories_group ${isCategoriesVisible ? 'visible' : 'hidden'}`}>
              <button className='voting_categories'>강의실 시설</button>
              <button className='voting_categories'>화장실 시설</button>
              <button className='voting_categories'>학생식당 개선</button>
              <button className='voting_categories'>각종 행사</button>
              <button className='voting_categories'>교통 시설</button>
              <button className='voting_categories'>보건 복지</button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showVotingModal} onHide={handleVotingModalClose} centered style={{ textAlign: 'center' }}>
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
              <button className='candidate-info-modal' type='submit' style={{ backgroundColor: '#fb7e75' }}>
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
