import React, { useState } from 'react';
import './LoginPage.css';
import LoginClassNum from './LoginClassnum';
import LoginPassword from './LoginPassword';

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
  )
}
export default LoginPage;