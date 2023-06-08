import React, { useState } from 'react';
import './CandidateTabs.css';

function CandidateTabs(props) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="candidate_tab">
      <ul className="nav candi-nav-tabs">
        {props.candidates && props.candidates.map((candidate, index) => (
          <li className="candi-nav-item" key={index}>
            <button className={`candi-nav-link ${activeTab === index ? 'active' : ''}`} onClick={() => handleTabClick(index)}>
              {candidate.name}
            </button>
          </li>
        ))}
      </ul> 
    </div>
  );
}

export default CandidateTabs;
