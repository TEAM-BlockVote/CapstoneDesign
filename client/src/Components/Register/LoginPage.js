import React from 'react';
import "./SignIn.css";

function LoginPage() {
  return (
    <div className='login_formbottom'>
      <div className='login_label1'>
        학번
      </div>
      <div className='login_input1'>
        <input name='classnumber' className='login_classnumber' type='text' placeholder='학번을 입력하세요.'></input>
      </div>
      <div className='login_label2'>
        비밀번호
      </div>
      <div className='login_input2'>
        <input name='password' className='login_password' type='password' placeholder='비밀번호를 입력하세요.'></input>
      </div>
      <button className='login_button'>로그인</button>
    </div>
  )
}
export default LoginPage;