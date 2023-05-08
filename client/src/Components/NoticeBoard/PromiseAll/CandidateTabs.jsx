import React, { useState } from 'react';

function CandidateTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
    <ul className="nav nav-tabs" style={{ width: '70%', margin: '0 auto' }}>
      <li className="nav-item">
        <a className={`nav-link ${activeTab === 0 ? 'active' : ''}`} href="javascript:void(0)" onClick={() => handleTabClick(0)}>
          후보자 1
        </a>
      </li>
      <li className="nav-item">
        <a className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href="javascript:void(0)" onClick={() => handleTabClick(1)}>
          후보자 2
        </a>
      </li>
      <li className="nav-item">
        <a className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href="javascript:void(0)" onClick={() => handleTabClick(2)}>
          후보자 3
        </a>
      </li>
    </ul>
   <br />
   <br />
    </>
  );
}

export default CandidateTabs;
