import { useState } from 'react';
import HorizonLine from './HorizonLine';
import './Main.css';

import img2 from './01.png';
import { Navigation} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(<Tab1/>);
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
              <div className="left">
                <h1 > 2023년 총학생회 투표 </h1>
                <h5> 서일대학교의 미래를 위해 함께 이끌어나갈 당신을 찾습니다. </h5>
                <h5>투표기간: 04.17 - 04.30 </h5>
              </div>
              <div className="right">
                <img className="img1" src={img2} alt="seoilLogo"/>
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
                  <button> 투표하기 </button>
                  <button> 결과보기 </button>
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
                  <button> 둘러보기 </button>
                </div>
              </div>
            </div>
          </div>
          <HorizonLine/>
          <div className="section-title">
            <span>특별함</span>
          </div>
          <div className="section-info">
            <div className="test1123">
              <div>
                <span style={{fontWeight: 'bold', fontSize: 3+'rem'}}> 온라인 전자투표 서비스 </span>
                <div style={{whiteSpace: 'pre-line', textAlign: "center", marginTop: 10+"%", fontSize:1.5+"rem"}}>
                  세상에 좋은 온라인 투표는 많습니다.<br/>
                  하지만, 내가 원하는 후보상이 누군지 모를때 <br/>
                  내가 투표한 정보가 위변조 되진 않을가 고민될때 <br/>
                  언제 어디서나 투표하고 싶을때<br/><br/>
                  답은 하나입니다.
                </div>
              </div>
            </div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper" style={{width:50 + '%', height:50 + '%'}}>
              <SwiperSlide><img className="img2" src={img2} alt="seoilLogo"/></SwiperSlide>
              <SwiperSlide><img className="img2" src={img2} alt="seoilLogo"/></SwiperSlide>
              <SwiperSlide><img className="img2" src={img2} alt="seoilLogo"/></SwiperSlide>
              <SwiperSlide><img className="img2" src={img2} alt="seoilLogo"/></SwiperSlide>
            </Swiper>
          </div>
          <HorizonLine/>
          <div className="section-title">
            <span>지금까지</span>
          </div>
          <span>이런 별거 없던 문제들</span>
          <div className="tab-wrapper">
            <ul className="tabs-list">
              <li className={activeIndex === 0 ? 'tab active' : 'tab'} onClick={() => handleTabClick(<Tab1/>, 0)}>개인사정</li>
              <li className={activeIndex === 1 ? 'tab active' : 'tab'} onClick={() => handleTabClick(<Tab2/>, 1)}>정보부족</li>
              <li className={activeIndex === 2 ? 'tab active' : 'tab'} onClick={() => handleTabClick(<Tab3/>, 2)}>전산화</li>
            </ul>
            {selectedTab}
          </div>
        </div>
      </div>
    </>
  );
};

const Tab1 = () => {

  return(
    <div className="" style={{display: 'block'}}>
      <ul style={{display: 'flex',flexWrap: 'wrap',width: 100+'%', listStyle: 'none', padding: 9+'rem' + 10.2+'rem' + 3+'rem'}}>
        <li style={{width: 50+'%'}}> 공강으로 인한 불참. </li>
        <li style={{width: 50+'%'}}> 코로나 확진. </li>
        <li style={{width: 50+'%'}}> 사고 </li>
        <li style={{width: 50+'%'}}> 피치못할 개인 사정. </li>
      </ul>
    </div>
  );
}
const Tab2 = () => {
  return(
    <div>tab222</div>
  );
}
const Tab3 = () => {
  return(
    <div>tab333</div>
  );
}

export default Main;
