import React, { useState } from 'react';
import JoinClassNum from './JoinClassNum';
import JoinName from './JoinName';
import JoinDep from './JoinDep';
import JoinPassword from './JoinPassword';
import JoinTel from './JoinTel';
import "./JoinPage.css";

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

        event.target.submit('join');
    }
    return (
        <form id='join' className='login_formbottom' onSubmit={JoinSubmit} action='/SignUp' method='post'>
            <div className='join_nlabel1'>
                학번
            </div>
            <div className='join_ninput1'>
                <input id='nclassnumber' name='nclassnumber' className='join_nclassnumber' type='text' maxLength={9} value={userClassNum} onChange={(e) => setClassNum(e.target.value)} placeholder='학번을 입력하세요.'></input>
            </div>
            <div className='join_nclassnumerror'>
                {userClassNumError && <div>{userClassNumError}</div>}
            </div>
            <div className='join_nlabel2'>
                이름
            </div>
            <div className='join_ninput2'>
                <input id='nname' name='nname' className='join_nname' type='text' maxLength={20} value={userName} onChange={(e) => setName(e.target.value)} placeholder='이름을 입력하세요.'></input>
            </div>
            <div className='join_nnameerror'>
                {userNameError && <div>{userNameError}</div>}
            </div>
            <div className='join_nlabelst'>
                학과
            </div>
            <div className='join_nselect'>
                <select name='ndep' className='join_ndep' value={userDep} onChange={(e) => setDep(e.target.value)} requir='true'>
                    <option value="ndep0" >학과를 선택하세요.</option>
                    <option value="ndep1">컴퓨터전자공학과</option>
                    <option value="ndep2">전기공학과</option>
                    <option value="ndep3">정보통신공학과</option>
                    <option value="ndep4">소프트웨어공학과</option>
                    <option value="ndep5">디지털트윈엘리베이터학과</option>
                    <option value="ndep6">AI융합콘텐츠학과</option>
                    <option value="ndep7">건축과</option>
                    <option value="ndep8">생명화학공학과</option>
                    <option value="ndep9">건설시스템공학과</option>
                    <option value="ndep10">스마트자동차공학과</option>
                    <option value="ndep11">간호학과</option>
                    <option value="ndep12">식품영양학과</option>
                    <option value="ndep13">사회복지학과</option>
                    <option value="ndep14">레저스포츠학과</option>
                    <option value="ndep15">비즈니스영어과</option>
                    <option value="ndep16">비즈니스일본어과</option>
                    <option value="ndep17">비즈니스중국어과</option>
                    <option value="ndep18">스마트경영학과</option>
                    <option value="ndep19">자산법률학과</option>
                    <option value="ndep20">미디어출판학과</option>
                    <option value="ndep21">세무회계학과</option>
                    <option value="ndep22">패션산업학과</option>
                    <option value="ndep23">생활가구디자인학과</option>
                    <option value="ndep24">실내디자인학과</option>
                    <option value="ndep25">VMD&전시디자인학과</option>
                    <option value="ndep26">영화방송공연예술학과</option>
                    <option value="ndep27">웹툰스토리텔링학과</option>
                    <option value="ndep28">유아교육학과</option>
                    <option value="ndep29">커뮤니케이션디자인학과</option>
                </select>
            </div>
            <div className='join_ndeperror'>
                {userDepError && <div>{userDepError}</div>}
            </div>
            <div className='join_nlabel3'>
                비밀번호
            </div>
            <div className='join_ninput3'>
                <input id='npassword' name='npassword' className='join_npassword' type='password' maxLength={20} value={userPass} onChange={(e) => setPass(e.target.value)} placeholder='비밀번호를 입력하세요.'></input>
            </div>
            <div className='join_ninput3_1'>
                <input id='npasswordchk' name='npasswordchk' className='join_npasswordchk' type='password' maxLength={20} value={userPassChk} onChange={(e) => setPassChk(e.target.value)} placeholder='비밀번호를 확인하세요.'></input>
            </div>
            <div className='join_npasswordchkerror'>
                {userPasswordError && <div>{userPasswordError}</div>}
            </div>
            <div className='join_nlabel4'>
                전화번호
            </div>
            <div className='join_ninput4'>
                <input name='nnumber' className='join_nnumber' type='tel' maxLength={11} value={userTelNum} onChange={(e) => setTelNum(e.target.value)} placeholder='전화번호를 입력하세요.'></input>
            </div>
            <div className='join_ntelnumerror'>
                {userTelNumError && <div>{userTelNumError}</div>}
            </div>
            <button type='submit' className='join_nbutton'>회원가입</button>
        </form>
    )
}
export default JoinPage;