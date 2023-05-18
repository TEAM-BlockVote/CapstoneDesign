import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignIn.css";
import JoinPage from './JoinPage';
import LoginPage from './LoginPage';
import AuthContext from '../../Store/auth-context';

export default function SignIn() {

  const [selectedTab, setSelectedTab] = useState(<LoginPage/>);
  const [activeIndex, setActiveIndex] = useState(0);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTabClick = (tab, index) => {
    setSelectedTab(tab);
    setActiveIndex(index);
  };

  useEffect(() => {
    if(ctx.isLoggedIn) {
      console.log("접근 불가능");
      navigate("/");
    }
  }, [ctx.isLoggedIn, navigate]);

  return ctx.isLoggedIn === null || ctx.isLoggedIn === true ? null : (
    <div className='sign_site'>
      <div className='sign_header'>
        <div className='sign_logo'>
        </div>
      </div>
      <div className='sign_wrapper'>
        <div className='sign_main'>
          <div className='sign_mainleft'>
            <div className='sign_letter'>
              BLOCK VOTE는 블록체인이라는
              <br></br>
              4차산업 혁명의 핵심기술을 통하여
              <br></br>
              사용자들의 개인정보 보안을 보장합니다.
            </div>
            <img src='/img/blockchain.png' className='loginimg_01' alt='loginimg' />
          </div>
            <div className='sign_mainright'>
              <div className='sign_form'>
                <div className='sign_contents'>
                  <ul className='sign_formtop'>
                    <li className={activeIndex === 0 ? 'sign_tab active' : 'sign_tab'} onClick={() => handleTabClick(<LoginPage/>, 0)}>로그인</li>
                    <li className={activeIndex === 1 ? 'sign_tab active' : 'sign_tab'} onClick={() => handleTabClick(<JoinPage />, 1)}>회원가입</li>
                  </ul>
                  {selectedTab}
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className='sign_footer'></div>
    </div>
  );
};
