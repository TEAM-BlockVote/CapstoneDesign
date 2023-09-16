import React from "react";
import underLogo from '../../Main/images/underLogo.png';
import "./Bottom.css";

function Bottom() {
  return (
    <div className="footer">
        <div className="footer-list">
          <p className='producers'>홈</p>
          <p className='producers'>개요</p>
          <p className='producers'>도움말</p>
          <p className='producers'>기능</p>
        </div>
        <div className='footer-logo'>
          <img className="under-logo" src={underLogo} alt="underLogo" />
        </div>
      </div>
  );
}

export default Bottom;



