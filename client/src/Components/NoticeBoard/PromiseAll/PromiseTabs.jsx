import React, { useState } from 'react';

function PromiseTabs() {
  const [activeIndex, setActiveIndex] = useState(0); // 현재 활성화된 버튼 index

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
          <a className={`nav-link ${activeIndex === 0 ? 'active' : ''}`} href="#" onClick={() => handleTabClick(0)}>공약 1</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeIndex === 1 ? 'active' : ''}`} href="#" onClick={() => handleTabClick(1)}>공약 2</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${activeIndex === 2 ? 'active' : ''}`} href="#" onClick={() => handleTabClick(2)}>공약 3</a>
        </li>
      </ul>
      <br />
    </>
  );
}

export default PromiseTabs;
