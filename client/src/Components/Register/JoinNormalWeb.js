import React, {useState} from 'react';
import "./JoinNormalWeb.css";
import {NavLink} from 'react-router-dom';

export default function JoinManageWeb() {
    const [userClassNum, setClassNum] = useState('');
    const [userName, setName] = useState('');
    const [userDep, setDep] = useState(false);
    const [userPass, setPass] = useState('');
    const [userPassChk, setPassChk] = useState('');
    const [userTelNum, setTelNum] = useState('');
    const [userPassError, setPassError] = useState(false);
    const [userDepError, setDepError] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if(userPass !== userPassChk) {
            return setPassError(true);
        }
        if(!userDep) {
            return setDepError(true);
        }
        console.log({
            userClassNum,
            userName,
            userDep,
            userPass,
            userPassChk,
            userTelNum
        });
    };

    const onChangeClassNum = (e) => {
        setClassNum(e.target.value);
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeDep = (e) => {
        setDepError(false);
        setDep(e.target.value);
    };

    const onChangePass = (e) => {
        setPass(e.target.value);
    };

    const onChangePassChk = (e) => {
        setPassError(e.target.value !== userPass);
        setPassChk(e.target.value);
    };

    const onChangeTelNum = (e) => {
        setTelNum(e.target.value);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className='join_site'>
                <div className='join_header'>
                    <div className='join_logo'>
                        BLOCK VOTE
                    </div>
                    </div>
                <div className='join_main1'>
                    <div className='join_main2'>
                        <div className='join_bodyleft'>
                            <div className='join_letter'>
                                BLOCK VOTE는 블록체인이라는
                                <br></br>
                                4차산업 혁명의 핵심기술을 통하여
                                <br></br>
                                사용자들의 개인정보 보안을 보장합니다. 
                            </div>
                            <img src='/img/blockchain.png' className='loginimg_01' alt='loginimg'/>
                        </div>
                        <div className='join_bodyright'>
                            <div className='join_form'>
                                <div className='join_normal'>
                                    <div className='join_formtop'>
                                        <NavLink to='/JoinNormalWeb' className='join_topnormal'>일반 회원가입</NavLink>
                                        <NavLink to='/JoinManageWeb' className='join_topmanage'>관리자 회원가입</NavLink>
                                    </div>
                                    <div className='join_formbottom'>
                                        <div className='join_nlabel1'>
                                            학번
                                        </div>
                                        <div className='join_ninput1'>
                                            <input id='nclassnumber' name='nclassnumber' className='join_nclassnumber' type='text' placeholder='학번을 입력하세요.'></input>
                                        </div>
                                        <div className='join_nlabel2'>
                                            이름
                                        </div>
                                        <div className='join_ninput2'>
                                            <input id='nname' name='nname' className='join_nname' type='text' placeholder='이름을 입력하세요.'></input>
                                        </div>
                                        <div className='join_nlabelst'>
                                            학과
                                        </div>
                                        <div className='join_nselect'>
                                            <select name='ndep' className='join_ndep'>
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
                                        <div className='join_nlabel3'>
                                            비밀번호
                                        </div>
                                        <div className='join_ninput3'>
                                            <input id='npassword' name='npassword' className='join_npassword' type='password' value={userPass} required onChange={onChangePass} placeholder='비밀번호를 입력하세요.'></input>
                                        </div>
                                        <div className='join_ninput3_1'>
                                            <input id='npasswordchk' name='npasswordchk' className='join_npasswordchk' type='password' value={userPassChk} required onChange={onChangePassChk} placeholder='비밀번호를 확인하세요.'></input>
                                            <div className='join_npasswordchkerror'>
                                                {userPassError && <div className='join_npasswordchk_error'>비밀번호가 일치하지 않습니다.</div>}
                                            </div>
                                        </div>
                                        <div className='join_nlabel4'>
                                            전화번호
                                        </div>
                                        <div className='join_ninput4'>
                                            <input name='nnumber' className='join_nnumber' type='tel' placeholder='전화번호를 확인하세요.'></input>
                                        </div>
                                        <button type='primary' className='join_nbutton'>회원가입</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        );
    }
