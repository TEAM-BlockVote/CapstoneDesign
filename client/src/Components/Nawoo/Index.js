import touchButton from '../Main/images/touchButton.png';
import React, { useEffect } from 'react';
import "./Index.css";

const Index = ({setCurrentPage}) => {
  const handleElementClick = (event) => {
    const nwForm = document.querySelector('.nw_form');
    if (nwForm.contains(event.target)) {
      setCurrentPage("NextPage")
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleElementClick);
    return () => {
      document.removeEventListener('click', handleElementClick);
    };
  }, []);
  return (
    <div className='nw_form'>
      <div className='nw_top'>
        <div className='nw_wrapper'>
          <label className='nw_header1'>나만의 후보 찾기</label>
           <div className="mask"><label className="text">나만의 후보 찾기</label></div>
          <label className='nw_label2'>
            <p className='nw_text1'>공약을 한눈에 정리해 놓은곳은 없을까?</p>
            <p className='nw_text2'>지금 선거 해야 하는데 공약을 볼 시간이 없네...</p>
            <p className='nw_text3'>내 성향에 맞는 후보를 쉽고 빠르게 찾고 싶어!</p>
          </label>
          { <div style={{height: '30px'}}>
              <svg className='svg_button' width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.7715 15.0647C12.3715 15.5496 11.6285 15.5496 11.2285 15.0647L0.359201 1.88628C-0.178757 1.23404 0.28519 0.25 1.13066 0.25L22.8693 0.250002C23.7148 0.250002 24.1788 1.23405 23.6408 1.88629L12.7715 15.0647Z" fill="#84F5B8"></path>
              </svg>
            </div>
          }
          <div className='result_borde'>
            <p> 1분만에 자신의 성향에 맞는 후보자를 추천해 줍니다 </p>
            <p> 후보자들이 어떤 공약을 냈는지 한눈에 볼 수 있습니다. </p>
          </div>
          <div className='start_button_margin'>
            <img src={touchButton} alt='buttonImg' className='touch_button'/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Index;