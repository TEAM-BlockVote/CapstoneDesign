import React, { useState } from 'react';
import PromiseNum from './PromiseNum';


function PromiseTabs() {
  const [activeIndex, setActiveIndex] = useState(0); 
  const [promises, setPromises] = useState([
    [
      "1번 공약: 더 좋은 대학교를 만들겠습니다.",
      "2번 공약: 더 많은 일자리를 창출하겠습니다.",
      "3번 공약: 교통체증 문제를 해결하겠습니다."
    ],
    [
      "1번 공약: 환경 보호를 위해 노력하겠습니다.",
      "2번 공약: 교육 개혁을 추진하겠습니다.",
      "3번 공약: 복지 제도를 강화하겠습니다."
    ],
    [
      "1번 공약: 더 나은 병원을 만들겠습니다.",
      "2번 공약: 소득 격차를 해소하겠습니다.",
      "3번 공약: 주택 가격 안정을 위해 노력하겠습니다."
    ]
  ]);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  }

  return (
    <>
      <br />
      <br />
      <br />
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item">
          <a className={`nav-link ${activeIndex === 0 ? 'active' : ''}`} href="#" onClick={() => handleTabClick(0)}>후보자 1</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeIndex === 1 ? 'active' : ''}`} href="#" onClick={() => handleTabClick(1)}>후보자 2</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeIndex === 2 ? 'active' : ''}`} href="#" onClick={() => handleTabClick(2)}>후보자 3</a>
        </li>
      </ul>
      <br />
      <br />

      <PromiseNum promise={promises[activeIndex]} />
    </>
  );
}

export default PromiseTabs;
