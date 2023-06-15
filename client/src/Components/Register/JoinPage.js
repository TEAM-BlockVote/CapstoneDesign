import React, { useState, useEffect } from 'react';
import JoinClassNum from './JoinClassNum';
import JoinName from './JoinName';
import JoinDep from './JoinDep';
import JoinPassword from './JoinPassword';
import JoinTel from './JoinTel';
import axios from 'axios';
import { useRef } from 'react';
import { depDataArray } from './depDataArray';
import "./JoinPage.css";
import kakaoImg from './images/kakaoImg.png';
import googleImg from './images/googleImg.png';

function JoinPage() {
    const [userClassNum, setClassNum] = useState("");
    const [userClassNumError, setClassNumError] = useState("");
    const [userName, setName] = useState("");
    const [userNameError, setNameError] = useState("");
    const [userDep, setDep] = useState(false);
    const [userDepError, setUserDepError] = useState("");
    const [userPass, setPass] = useState("");
    const [userPassChk, setPassChk] = useState("");
    const [userPasswordError, setPasswordError] = useState("");
    const [userTelNum, setTelNum] = useState("");
    const [userTelNumError, setTelNumError] = useState("");

    const [hasStudentNumber, setHasStudentNumber] = useState(null);
    const studentNumberRef = useRef(null);

    const dropdownRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [userDepCard, setUserDepCard] = useState("depcard");

    const handleSearch = (event) => {
        setDep(false);
        const inputValue = event.target.value.toLowerCase();
        setSearchValue(inputValue);

        const filtered = depDataArray.filter(item => item.includes(inputValue));
        if (filtered.length > 0) {

            setFilteredData(filtered);
            setUserDepCard("depcard-active");
        } else {
            setUserDepCard("depcard");
        }
    };

    const handleSelectItem = (item) => {
        setDep(item);
        setSearchValue('');
        setFilteredData([]);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setFilteredData([]);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

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
            return setUserDepError(error3);
        } else {
            setUserDepError("");
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
                if (res.data) { //학생이 존재하면 true
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
                {hasStudentNumber && <span style={{ color: 'red' }} > 이미 존재하는 학번입니다. </span>}

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
                    <input id='dep' name='dep' className='join_input' type='text' value={userDep ? userDep : searchValue} onChange={handleSearch} placeholder="학과를 입력하세요" />
                </div>
                <div className='join_error'>
                    {userDepError && <div>{userDepError}</div>}
                </div>
                <div className='join_dep'>
                    {filteredData.length > 0 && (
                        <ul ref={dropdownRef} className={`${userDepCard}`}>
                            {filteredData.map((item, index) => (
                                <li key={index} onClick={() => { handleSelectItem(item); setUserDepCard("testt2222"); }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
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
                </div>
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
            <div style={{ fontSize: '13px', marginBottom: '5%' }}>다른 계정으로 로그인 하기</div>
            <div style={{ display: 'flex', padding: '0 5%', marginBottom: '5%' }}>
                <form action='/auth/kakaoLogin' method='post'>
                    <button type="submit" className='' style={{ border: 0, background: 'none', cursor: 'pointer' }}>
                        <img src={kakaoImg} alt='kakaoimg' style={{ width: '50%' }} />
                        <div className='providerName'>kakao</div>
                    </button>
                </form>
                <form action='/auth/googleLogin' method='post'>
                    <button type="submit" className='' style={{ border: 0, background: 'none', cursor: 'pointer' }}>
                        <img src={googleImg} alt='googleimg' style={{ width: '50%' }} />
                        <div className='providerName'>google</div>
                    </button>
                </form>
            </div>
        </>
    )
}
export default JoinPage;