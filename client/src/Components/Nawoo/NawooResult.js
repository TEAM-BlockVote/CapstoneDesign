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
            <label className='result_highlight'>{selectedCandidate}</label> 후보자입니다!
          </div>
        </div>
      </div>
    </div>
  )
}

export default NawooResult;