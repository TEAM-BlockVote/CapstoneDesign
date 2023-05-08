import React from 'react';
import "./LogJoinWeb.css";
import {NavLink} from 'react-router-dom';

export default function LogJoinWeb() {
    return (
            <div className='login_site'>
                <div className='login_header'>
                    <div className='login_logo'>
                        BLOCK VOTE
                    </div>
                    </div>
                <div className='login_main1'>
                    <div className='login_main2'>
                        <div className='login_bodyleft'>
                            <div className='login_letter'>
                                BLOCK VOTE는 블록체인이라는
                                <br></br>
                                4차산업 혁명의 핵심기술을 통하여
                                <br></br>
                                사용자들의 개인정보 보안을 보장합니다. 
                            </div>
                            <img src='/img/blockchain.png' className='loginimg_01' alt='loginimg'/>
                        </div>
                        <div className='login_bodyright'>
                            <div className='login_form'>
                                <div className='login_join'>
                                    <div className='login_formtop'>
                                        <NavLink to='/' className='login_topjoin'>로그인</NavLink>
                                        <NavLink to='/LogJoinWeb' className='login_toplogin'>회원가입</NavLink>
                                    </div>
                                    <div className='login_formbottom'>
                                        <NavLink to='/JoinNormalWeb'>
                                            <img src='/img/normaluser.png' className='joinimg_01' alt='joinnormal'/>
                                        </NavLink>
                                        <div className='login_joinl1'>
                                            일반 회원가입
                                        </div>
                                        <NavLink to='/JoinManageWeb'>
                                            <img src='/img/manageuser.png' className='joinimg_02' alt='joinmanage'/>
                                        </NavLink>
                                        <div className='login_joinl2'>
                                            관리자 회원가입
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
