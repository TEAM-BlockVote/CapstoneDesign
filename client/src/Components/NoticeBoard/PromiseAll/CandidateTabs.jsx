import React, { useState } from 'react';

function CandidateTabs(props) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <ul className="nav nav-tabs" style={{ width: '70%', margin: '0 auto' }}>
        {props.candidates && props.candidates.map((candidate, index) => (
          <li className="nav-item" key={index}>
            <a className={`nav-link ${activeTab === index ? 'active' : ''}`} href="javascript:void(0)" onClick={() => handleTabClick(index)}>
              {candidate.name}
            </a>
          </li>
        ))}
      </ul>
      <br />
      <br />
    </>
  );
}

export default CandidateTabs;
