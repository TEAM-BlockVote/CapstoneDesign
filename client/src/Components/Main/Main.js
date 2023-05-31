import { useState } from 'react';
import { Link } from "react-router-dom";
import HorizonLine from './HorizonLine';
import './Main.css';
import bannerLogo from './images/seoilLogo.png';
import Team from './images/Team.png';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Tab from './Tab';
import Future from './Future';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(<Tab index={0}/>);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (tab,index) => {
    setSelectedTab(tab);
    setActiveIndex(index);
  };

  return (
    <>
      <div className="main_content_wrapper">
        <div className="main_content">
          <div className="banner">
            <div className="banner_info">
              <div className="banner_left">
                <h1 > 2023년 총학생회 투표 </h1>
                <h5> 서일대학교의 미래를 위해 함께 이끌어나갈 당신을 찾습니다. </h5>
                <h5> 투표기간: 04.17 - 04.30 </h5>
              </div>
              <div className="banner_right">
                <img className="banner_img" src={bannerLogo} alt="seoilLogo"/>
              </div>
            </div>
          </div>
          <div className="vote_info_wrapper">
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
          </div>
          <HorizonLine/>
          <div className="section-title">
            <p className="main_title">특별함</p>
          </div>
          <div className="section-info">
            <div className="section_content">
              <div className="section-info-wrapper" >
                <span className="section-info-title" > 온라인 전자투표 서비스 </span>
                <div className="section-info-content" >
                  세상에 좋은 온라인 투표는 많습니다.<br/>
                  하지만, 내가 원하는 후보상이 누군지 모를때 <br/>
                  내가 투표한 정보가 위변조 되진 않을까 고민될때 <br/>
                  언제 어디서나 투표하고 싶을때<br/><br/>
                  답은 하나입니다.
                </div>
              </div>
            </div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
              <SwiperSlide><img className="swiper-img" src={Team} alt="swiperImg"/></SwiperSlide>
              <SwiperSlide><img className="swiper-img" src={Team} alt="swiperImg"/></SwiperSlide>
              <SwiperSlide><img className="swiper-img" src={Team} alt="swiperImg"/></SwiperSlide>
              <SwiperSlide><img className="swiper-img" src={Team} alt="swiperImg"/></SwiperSlide>
            </Swiper>
          </div>
          <HorizonLine/>
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
          <HorizonLine/>
          <div className="section-title">
            <p className="main_title">BlockVote와 함께한다면?</p>
            <p className="sub_title">아래와 같은 결과를 함께 만들어 나갈수 있어요</p>
          </div>
          {<Future/>}
        </div>
      </div>
      <div className="footer">
        <div className="footer-content">
          <p style={{color: '#adb5bd', fontSize: 2+'rem'}}> BlockVote </p>
          <p style={{color: '#adb5bd'}}> 전준호 이서진 유승민 나윤성 </p>
          <p>  </p>
        </div>
      </div>
    </>
  );
};

export default Main;
