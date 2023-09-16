import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { Link } from "react-router-dom";
import HorizonLine from './HorizonLine';
import './Main.css';
import bannerLogo from './images/seoilLogo.png';
import underLogo from '../Main/images/underLogo.png';
import Team from './images/Team.png';
import MakeVote from './images/makeVote.png';
import Voting from './images/voting.png';
import Result from './images/result.png';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Tab from './Tab';
import Future from './Future';
import VoteBox from './VoteBox';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(<Tab index={0} />);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (tab, index) => {
    setSelectedTab(tab);
    setActiveIndex(index);
  };

  const [showVotingModal, setShowVotingModal] = useState(false);
  const handleVotingModalClose = () => setShowVotingModal(false);
  const handleVotingModalShow = () => setShowVotingModal(true);

  const [showResultModal, setShowResultModal] = useState(false);
  const handleResultModalClose = () => setShowResultModal(false);
  const handleResultModalShow = () => setShowResultModal(true);

  return (
    <>
      {/* {<SignInModal/>} */}
      <div className="main_content_wrapper">
        <div className="main_content">
          <div className="banner">
            <div className="banner_info">
              <div className="banner_left">
                <p className='banner-vote'> 2023년 총학생회 투표 </p>
                <p className='banner-written'> 서일대학교의 미래를 위해 함께 이끌어나갈 당신을 찾습니다. </p>
                <p className='banner-date'> 투표기간: 04.17 - 04.30 </p>
              </div>
              <div className="banner_right">
                <img className="banner_img" src={bannerLogo} alt="seoilLogo" />
              </div>
            </div>
          </div>
          {/* <div className="vote_info_wrapper">
            <div>
              현재 진행중인 투표 -
              <div className="vote_container">
                <div className="vote_name"> 2023 서일대학교 총학생회 투표 </div>
                <hr/>
                <div className="vote_info">
                  <div className="voting_day">투표일</div>
                  <div className="voting_day_detail">20-02-18(화) 00:01 ~ 20-03-14(토) 23:59</div>
                </div>
                <div className="vote_action">
                <Link to="/voting"> <button className="main-btn"> 투표하기 </button></Link>
                  <button className="main-btn"> 결과보기 </button>
                </div>
              </div>
            </div>
            <div>
              진행 예정 투표 - 
              <div className="vote_container">
                <div className="vote_name"> 2023 서일대학교 총학생회 투표 </div>
                <hr/>
                <div className="vote_info">
                  <div className="voting_day">투표일</div>
                  <div className="voting_day_detail">20-02-18(화) 00:01 ~ 20-03-14(토) 23:59</div>
                </div>
                <div className="vote_action">
                  <button className="main-btn"> 둘러보기 </button>
                </div>
              </div>
            </div>
          </div> */}
          <div className="tab-wrapper">
            <ul className="tabs-list" style={{ margin: '0 10%' }}>
              <li className='go-link' onClick={handleVotingModalShow}>
                <img className='tab-img' src={Voting} alt='투표하기'></img>
                <div className='tab-label'> 투표하기 </div>
              </li>
              <li className='go-link' onClick={handleResultModalShow}>
                <img className='tab-img' src={Result} alt='결과보기'></img>
                <div className='tab-label'> 결과보기 </div>
              </li>
              <li className='go-link'>
                <img className='tab-img' src={MakeVote} alt='투표 신청하기'></img>
                <div className='tab-label'> 투표 신청하기 </div>
              </li>
            </ul>
          </div>
          <HorizonLine />
          <div className="section-title">
            <p className="main_title">특별함</p>
          </div>
          <div className="section-info">
            <div className="section_content">
              <div className="section-info-wrapper" >
                <span className="section-info-title" > 온라인 전자투표 서비스 </span>
                <div className="section-info-content" >
                  세상에 좋은 온라인 투표는 많습니다.<br />
                  하지만, 내가 원하는 후보상이 누군지 모를때 <br />
                  내가 투표한 정보가 위변조 되진 않을까 고민될때 <br />
                  언제 어디서나 투표하고 싶을때<br /><br />
                  답은 하나입니다.
                </div>
              </div>
            </div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper" style={{ cursor: 'pointer' }}
              onClick={(swiper, e) => {
                if (e.target.className === "swiper-button-prev") {
                  swiper.slidePrev();
                } else if (e.target.className === "swiper-button-next") {
                  swiper.slideNext();
                }
              }}
            >
              <SwiperSlide><img className="swiper-img" src={Team} alt="swiperImg" /></SwiperSlide>
              <SwiperSlide><img className="swiper-img" src={Team} alt="swiperImg" /></SwiperSlide>
              <SwiperSlide><img className="swiper-img" src={Team} alt="swiperImg" /></SwiperSlide>
              <SwiperSlide><img className="swiper-img" src={Team} alt="swiperImg" /></SwiperSlide>
            </Swiper>
          </div>
          <HorizonLine />
          <div className="section-title">
            <p className="main_title">지금까지</p>
            <p className="sub_title">이런 별거 없었던 문제들 해결해 드리겠습니다.</p>
          </div>
          <div className="tab-wrapper">
            <ul className="tabs-list">
              <li className={activeIndex === 0 ? 'tab active' : 'tab'} onClick={() => handleTabClick(<Tab index={0} />, 0)}>개인사정</li>
              <li className={activeIndex === 1 ? 'tab active' : 'tab'} onClick={() => handleTabClick(<Tab index={1} />, 1)}>정보부족</li>
              <li className={activeIndex === 2 ? 'tab active' : 'tab'} onClick={() => handleTabClick(<Tab index={2} />, 2)}>전산화</li>
            </ul>
            {selectedTab}
          </div>
          <HorizonLine />
          <div className="section-title">
            <p className="main_title">BlockVote와 함께한다면?</p>
            <p className="sub_title">아래와 같은 결과를 함께 만들어 나갈수 있습니다.</p>
          </div>
          {<Future />}
        </div>
      </div>
      <div className="footer">
        <div className="footer-list">
          <p className='producers'>홈</p>
          <p className='producers'>개요</p>
          <p className='producers'>도움말</p>
          <p className='producers'>기능</p>
        </div>
        <div className='footer-logo'>
          <img className="under-logo" src={underLogo} alt="underLogo" />
        </div>
      </div>
      <Modal show={showVotingModal} onHide={handleVotingModalClose} centered style={{ textAlign: 'center' }}>
        <Modal.Header style={{ borderBottom: 'rgb(222,222,222)' }}>
          <CloseButton onClick={handleVotingModalClose} />
        </Modal.Header>
        <Modal.Body>
          <form action='vote/hasVoteNumberVoting' method='get'>
            {<VoteBox />}
            <input placeholder='발송 문자 7자리 숫자' name='voteCode' />
            <button className='votebox-submit' type='submit'>
              투표하러가기
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showResultModal} onHide={handleResultModalClose} centered style={{ textAlign: 'center' }}>
        <Modal.Header style={{ borderBottom: 'rgb(222,222,222)' }}>
          <CloseButton onClick={handleResultModalClose} />
        </Modal.Header>
        <Modal.Body>
          {<VoteBox />}
          <input placeholder='발송 문자 7자리 숫자' name='voteCode' />
          <button className='votebox-submit' onClick={() => { alert("아직 투표가 끝나지 않았습니다.") }}>
            결과보러가기
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Main;
