import React from 'react';
import "./JoinManageWeb.css";
import {NavLink} from 'react-router-dom';

export default function JoinManageWeb() {
    return (
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
                                <div className='join_manage'>
                                    <div className='join_formtop'>
                                        <NavLink to='/JoinNormalWeb' className='join_topmanage'>일반 회원가입</NavLink>
                                        <NavLink to='/JoinManageWeb' className='join_topnormal'>관리자 회원가입</NavLink>
                                    </div>
                                    <div className='join_formbottom'>
                                    <div className='join_mlabel1'>
                                            학번
                                        </div>
                                        <div className='join_minput1'>
                                            <input name='mclassnumber' className='join_mclassnumber' type='text' placeholder='학번을 입력하세요.'></input>
                                        </div>
                                        <div className='join_mlabel2'>
                                            관리자 이름
                                        </div>
                                        <div className='join_minput2'>
                                            <input name='mname' className='join_mname' type='text' placeholder='이름을 입력하세요.'></input>
                                        </div>
                                        <div className='join_mlabelst1'>
                                            이용기관 구분
                                        </div>
                                        <div className='join_mselect1'>
                                            <select name='mdep' className='join_mdep'>
                                                <option value="mdep0" selected>이용기관을 선택하세요.</option>
                                                <option value="mdep1">대학 본부</option>
                                                <option value="mdep2">대학 학생회</option>
                                            </select>
                                        </div>
                                        <div className='join_mlabelst2'>
                                            이용기관 명
                                        </div>
                                        <div className='join_mselect2'>
                                            <input name='moffice' className='join_moffice' type='text' placeholder='이용기관을 입력하세요.'></input>
                                        </div>
                                        <div className='join_mlabel3'>
                                            비밀번호
                                        </div>
                                        <div className='join_minput3'>
                                            <input name='mpassword' className='join_mpassword' type='password' placeholder='비밀번호를 입력하세요.'></input>
                                        </div>
                                        <div className='join_minput3_1'>
                                            <input name='mpasswordchk' className='join_mpasswordchk' type='password' placeholder='비밀번호를 확인하세요.'></input>
                                        </div>
                                        <div className='join_mlabel4'>
                                            전화번호
                                        </div>
                                        <div className='join_minput4'>
                                            <input name='mnumber' className='join_mnumber' type='tel' placeholder='전화번호를 확인하세요.'></input>
                                        </div>
                                        <button className='join_mbutton'>회원가입</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
