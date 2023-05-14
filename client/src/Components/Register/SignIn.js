import React, { useState } from 'react';
import "./SignIn.css";
import "./JoinNormalWeb.css"
import JoinPage from './JoinCompPage';

export default function SignIn() {

    const [selectedTab, setSelectedTab] = useState(<LoginTab/>);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTabClick = (tab, index) => {
        setSelectedTab(tab);
        setActiveIndex(index);
    };
    return (
        <div className='register_site'>
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
                        <img src='/img/blockchain.png' className='loginimg_01' alt='loginimg' />
                    </div>
                    <div className='login_bodyright'>
                        <div className='login_form'>
                            <div className='login_login'>
                                <ul className='login_formtop'>
                                    <li className={activeIndex === 0 ? 'sign_tab active' : 'sign_tab'} onClick={() => handleTabClick(<LoginTab />, 0)}>로그인</li>
                                    <li className={activeIndex === 1 ? 'sign_tab active' : 'sign_tab'} onClick={() => handleTabClick(<JoinTab />, 1)}>회원가입</li>
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
}

const LoginTab = () => {

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
    );
}
const JoinTab = () => {
    return (
        <JoinPage/>
    );
}
