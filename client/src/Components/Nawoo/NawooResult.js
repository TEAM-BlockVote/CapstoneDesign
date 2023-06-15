import React, { useState } from 'react';
import "./NawooResult.css";

function NawooResult() {
  const candidates = [
    { name: "전준호", image: "/jeon.jpg" },
    { name: "이서진", image: "/lee.jpg" },
    { name: "유승민", image: "/yoo.jpg" },
    { name: "나윤성", image: "/na.png" }
  ];
  const [selectedCandidate, setSelectedCandidate] = useState("???");
  const [imageClicked, setImageClicked] = useState(false);

  const handleImageClick = () => {
    if (!imageClicked) {
      const randomIndex = Math.floor(Math.random() * candidates.length);
      setSelectedCandidate(candidates[randomIndex].name);
      setImageClicked(true);
    }
  };

  return (
    <div className='nawoo_form'>
      <div className='result'>
        <div className='result_top'>
          <div className='result_logo'>
            원하시던 후보자는 누구?!<br />
            사진을 클릭하세요!
          </div>
        </div>
        <div className='result_middle'>
          <div className='result_img'>
            <img
              src={selectedCandidate !== "???" ? `/img/${candidates.find(candidate => candidate.name === selectedCandidate).image}` : '/img/nawooresult.png'}
              className={imageClicked ? 'highlight_img' : 'candidates_img'}
              alt='nawooimg'
              onClick={handleImageClick}
            />
          </div>
        </div>
        <div className='result_bottom'>
          <div className='result_logo'>
            원하시던 후보자는...<br />
            <div>
              <label className='result_highlight'>{selectedCandidate}</label> 후보자입니다! <br />
            </div>
          </div>
          <div className='result_select' style={{ display: imageClicked ? 'flex' : 'none' }}>
            <div className='result_check'>
              <label className='result_category'>선택한 항목</label>
              <label className='result_pick'>건물 인테리어를 개선</label>
              <label className='result_pick'>실습 강의 개선</label>
              <label className='result_pick'>학교 식단 개선</label>
              <br/>
              <label className='result_category'>선택하지 않은 항목</label>
              <label className='result_nonpick'>충전기 설치</label>
              <label className='result_nonpick'>목욕탕 시설 추가</label>
              <label className='result_nonpick'>신체 활동 프로그램 강화</label>
              <label className='result_nonpick'>방학 여행 프로그램</label>     
              <label className='result_nonpick'>이론 강의 개선</label>
              <label className='result_nonpick'>자율적인 학습 강화</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NawooResult;