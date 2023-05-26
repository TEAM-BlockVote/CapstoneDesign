import React, { useContext, useState, useEffect } from 'react';
import "./NawooMain.css";

function NawooMain() {
  return (
    <div className='nawoo_form'>
      <div className='nawoo_top'>
        <div className='nawoo_logo'>
          내가 원하는 후보상은?<br />
          나만의 후보찾기
        </div>
      </div>
      <div className='nawoo_middle'>
        <div className='nawoo_image'>
          <img src='/img/nawoomain.png' className='nawoo_img' alt='nawooimg' />
        </div>
      </div>
      <div className='nawoo_bottom'>
        <div className='nawoo_logo'>
          화면을 눌러 시작해주세요!
        </div>
      </div>
    </div>
  );
};
export default NawooMain;