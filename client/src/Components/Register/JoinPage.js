import React, { useState } from 'react';
import JoinClassNum from './JoinClassNum';
import JoinName from './JoinName';
import JoinDep from './JoinDep';
import JoinPassword from './JoinPassword';
import JoinTel from './JoinTel';
import axios from 'axios';
import { useRef } from 'react';
import "./JoinPage.css";
import kakaoImg from './images/kakaoImg.png';
import googleImg from './images/googleImg.png';

function JoinPage() {
    const [userClassNum, setClassNum] = useState("");
    const [userClassNumError, setClassNumError] = useState("");
    const [userName, setName] = useState("");
    const [userNameError, setNameError] = useState("");
    const [userDep, setDep] = useState("");
    const [userDepError, setDepError] = useState("");
    const [userPass, setPass] = useState("");
    const [userPassChk, setPassChk] = useState("");
    const [userPasswordError, setPasswordError] = useState("");
    const [userTelNum, setTelNum] = useState("");
    const [userTelNumError, setTelNumError] = useState("");

    const [hasStudentNumber, setHasStudentNumber] = useState(null);
    const studentNumberRef = useRef(null);

    const JoinSubmit = (event) => {
        event.preventDefault();
        
        const error1 = JoinClassNum(userClassNum);
        if (error1) {
            return setClassNumError(error1);
        } else {
            setClassNumError("");
        }

        const error2 = JoinName(userName);
        if (error2) {
            return setNameError(error2);
        } else {
            setNameError("")
        }

        const error3 = JoinDep(userDep);
        if (error3) {
            return setDepError(error3);
        } else {
            setDepError("");
        }

        const error4 = JoinPassword(userPass, userPassChk)
        if (error4) {
            return setPasswordError(error4);
        } else {
            setPasswordError("");
        }

        const error5 = JoinTel(userTelNum)
        if (error5) {
            return setTelNumError(error5);
        } else {
            setTelNumError("");
        }

        event.target.submit();
    }

    const getStudentNumber = () => {
      const element = studentNumberRef.current;      
      axios.get(`/auth/hasStudentNumber?studentNumber=${element.value}`)
      .then((res) => {
        if(res.data) { //학생이 존재하면 true
          setHasStudentNumber(res.data);
        } else {
          setHasStudentNumber(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    return (
      <>
        <form className='sign_formbottom' onSubmit={JoinSubmit} action='/auth/signup' method='post'>
            <div className='join_labelstart'>
                학번
            </div>
            <div className='join_div'>
                <input ref={studentNumberRef} onBlur={getStudentNumber} id='studentNumber' name='studentNumber' className='join_input' type='text' maxLength={9} value={userClassNum} onChange={(e) => setClassNum(e.target.value)} placeholder='학번을 입력하세요.'></input>
            </div>
            {hasStudentNumber && <span style={{color: 'red'}} > 이미 존재하는 학번입니다. </span>}
              
            <div className='join_error'>
                {userClassNumError && <div>{userClassNumError}</div>}
            </div>
            <div className='join_label'>
                이름
            </div>
            <div className='join_div'>
                <input id='name' name='name' className='join_input' type='text' maxLength={20} value={userName} onChange={(e) => setName(e.target.value)} placeholder='이름을 입력하세요.'></input>
            </div>
            <div className='join_error'>
                {userNameError && <div>{userNameError}</div>}
            </div>
            <div className='join_label'>
                학과
            </div>
            <div className='join_div'>
                <select id='dep' name='dep' className='join_select' value={userDep} onChange={(e) => setDep(e.target.value)} requir='true'>
                    <option value="join_dep0" >학과를 선택하세요.</option>
                    <option value="컴퓨터전자공학과">컴퓨터전자공학과</option>
                    <option value="전기공학과">전기공학과</option>
                    <option value="정보통신공학과">정보통신공학과</option>
                    <option value="소프트웨어공학과">소프트웨어공학과</option>
                    <option value="디지털트윈엘리베이터학과">디지털트윈엘리베이터학과</option>
                    <option value="AI융합콘텐츠학과">AI융합콘텐츠학과</option>
                    <option value="건축과">건축과</option>
                    <option value="생명화학공학과">생명화학공학과</option>
                    <option value="건설시스템공학과">건설시스템공학과</option>
                    <option value="스마트자동차공학과">스마트자동차공학과</option>
                    <option value="간호학과">간호학과</option>
                    <option value="식품영양학과">식품영양학과</option>
                    <option value="사회복지학과">사회복지학과</option>
                    <option value="레저스포츠학과">레저스포츠학과</option>
                    <option value="비즈니스영어과">비즈니스영어과</option>
                    <option value="비즈니스일본어과">비즈니스일본어과</option>
                    <option value="비즈니스중국어과">비즈니스중국어과</option>
                    <option value="스마트경영학과">스마트경영학과</option>
                    <option value="자산법률학과">자산법률학과</option>
                    <option value="미디어출판학과">미디어출판학과</option>
                    <option value="세무회계학과">세무회계학과</option>
                    <option value="패션산업학과">패션산업학과</option>
                    <option value="생활가구디자인학과">생활가구디자인학과</option>
                    <option value="실내디자인학과">실내디자인학과</option>
                    <option value="VMD&전시디자인학과">VMD&전시디자인학과</option>
                    <option value="영화방송공연예술학과">영화방송공연예술학과</option>
                    <option value="웹툰스토리텔링학과">웹툰스토리텔링학과</option>
                    <option value="유아교육학과">유아교육학과</option>
                    <option value="커뮤니케이션디자인학과">커뮤니케이션디자인학과</option>
                </select>
            </div>
            <div className='join_error'>
                {userDepError && <div>{userDepError}</div>}
            </div>
            <div className='join_label'>
                비밀번호
            </div>
            <div className='join_div'>
                <input id='password' name='password' className='join_input' type='password' maxLength={20} value={userPass} onChange={(e) => setPass(e.target.value)} placeholder='비밀번호를 입력하세요.'></input>
            </div>
            <div className='join_div'>
                <input id='passwordchk' name='passwordchk' className='join_passchk' type='password' maxLength={20} value={userPassChk} onChange={(e) => setPassChk(e.target.value)} placeholder='비밀번호를 확인하세요.'></input>
            </div>
            <div className='join_error'>
                {userPasswordError && <div>{userPasswordError}</div>}
            </div>n
            <div className='join_label'>
                전화번호
            </div>
            <div className='join_div'>
                <input id='telNumber' name='telNumber' className='join_input' type='tel' maxLength={11} value={userTelNum} onChange={(e) => setTelNum(e.target.value)} placeholder='전화번호를 입력하세요.'></input>
            </div>
            <div className='join_error'>
                {userTelNumError && <div>{userTelNumError}</div>}
            </div>
            <button type='submit' className={hasStudentNumber ? 'join_button_disabled' : 'join_button'} disabled={hasStudentNumber}>회원가입</button>
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
        </div>
      </>
    )
}
export default JoinPage;