import React, { useState } from 'react';
import './CandidateTabs.css';

function CandidateTabs(props) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <ul className="nav candi-nav-tabs">
        {props.candidates && props.candidates.map((candidate, index) => (
          <li className="candi-nav-item" key={index}>
            <a className={`candi-nav-link ${activeTab === index ? 'active' : ''}`} href="javascript:void(0)" onClick={() => handleTabClick(index)}>
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
