import React from 'react';
import "./NawooResult.css";

function NawooResult() {
  return (
    <div className='nawoo_form'>
      <div className='result_top'>
        <div className='result_logo'>
          당신이 원하는 후보는 누구?!
        </div>
      </div>
      <div className='result_top'>
        <div className='result_img'>
          <img src='/img/nawooresult.png' className='result_img' alt='nawooimg' />
        </div>
      </div>
      <div className='result_bottom'>
        <div className='result_logo'>
          당신이 원하던 후보는 ... <br/>
          전준호 후보님입니다!
        </div>
      </div>
    </div>
  )
}

export default NawooResult;