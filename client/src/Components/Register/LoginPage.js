import React, { useState } from 'react';
import './LoginPage.css';
import LoginClassNum from './LoginClassnum';
import LoginPassword from './LoginPassword';
import kakaoImg from './images/kakaoImg.png';
import googleImg from './images/googleImg.png';
import naverImg from './images/naverImg.png';
import instaImg from './images/instaImg.png';

function LoginPage() {
  const [userClassNum, setClassNum] = useState("");
  const [userClassNumError, setClassNumError] = useState("");
  const [userPass, setPass] = useState("");
  const [userPasswordError, setPasswordError] = useState("");

  const LoginSubmit = (event) => {
    event.preventDefault();

    const error1 = LoginClassNum(userClassNum);
    if (error1) {
      return setClassNumError(error1);
    } else {
      setClassNumError("");
    }

    const error4 = LoginPassword(userPass)
    if (error4) {
      return setPasswordError(error4);
    } else {
      setPasswordError("");
    }

    return event.target.submit();
  }

  return (
    <>
    <form className='sign_formbottom' onSubmit={LoginSubmit} action='/auth/localLogin' method='post'>
      <div className='login_labelstart'>
        학번
      </div>
      <div className='login_div'>
        <input name='studentNumber' className='login_input' type='text' maxLength={9} value={userClassNum} onChange={(e) => setClassNum(e.target.value)} placeholder='학번을 입력하세요.'></input>
      </div>
      <div className='login_error'>
        {userClassNumError && <div>{userClassNumError}</div>}
      </div>
      <div className='login_label'>
        비밀번호
      </div>
      <div className='login_div'>
        <input name='password' className='login_input' type='password' maxLength={20} value={userPass} onChange={(e) => setPass(e.target.value)} placeholder='비밀번호를 입력하세요.'></input>
      </div>
      <div className='login_error'>
        {userPasswordError && <div>{userPasswordError}</div>}
      </div>
      <button type='submit' className='login_button'>로그인</button>
    </form>

    <div style={{fontSize: '13px', marginBottom: '5%'}}>다른 계정으로 로그인 하기</div>    
    <div style={{display: 'flex', padding: '0 5%', marginBottom: '5%'}}>
    <form action='/auth/kakaoLogin' method='post'>
      <button type="submit" className='' style={{border: 0, background: 'none', cursor: 'pointer'}}>
        <img src={kakaoImg} alt='kakaoimg' style={{width: '50%'}}/>
        <div className='providerName'>kakao</div>
      </button>
    </form>
    <form action='/auth/googleLogin' method='post'>
      <button type="submit" className='' style={{border: 0, background: 'none', cursor: 'pointer'}}>
        <img src={googleImg} alt='googleimg' style={{width: '50%'}}/>
        <div className='providerName'>google</div>
      </button>
    </form>
    <form action='/auth/naverLogin' method='post'>
      <button type="submit" className='' style={{border: 0, background: 'none', cursor: 'pointer'}}>
        <img src={naverImg} alt='naverImg' style={{width: '50%'}}/>
        <div className='providerName'>naver</div>
      </button>
    </form>
    <form action='/auth/instaLogin' method='post'>
      <button type="submit" className='' style={{border: 0, background: 'none', cursor: 'pointer'}}>
        <img src={instaImg} alt='instaImg' style={{width: '50%'}}/>
        <div className='providerName'>instagram</div>
      </button>
    </form>
    </div>
    </>
  )
}
export default LoginPage;