import React, {useState} from 'react';

import JoinCompClassNum from './JoinCompClassNum';
import JoinCompManager from './JoinCompManager';
import JoinCompAgency from './JoinCompAgency';
import JoinCompOffice from './JoinCompOffice';
import JoinCompPassword from './JoinCompPassword';
import JoinCompTel from './JoinCompTel';

export default function JoinManageWeb() {
    const [userClassNum, setClassNum] = useState("");
    const [userClassNumError, setClassNumError] = useState("");
    const [userManager, setManager] = useState("");
    const [userManagerError, setManagerError] = useState("");
    const [userAgency, setAgency] = useState("");
    const [userAgencyError, setAgencyError] = useState("");
    const [userOffice, setOffice] = useState("");
    const [userOfficeError,setOfficeError] = useState("");
    const [userPass, setPass] = useState("");
    const [userPassChk, setPassChk] = useState("");
    const [userPasswordError, setPasswordError] = useState("");
    const [userTelNum, setTelNum] = useState("");
    const [userTelNumError, setTelNumError] = useState("");
    
    const ManageJoinSubmit = (event) => {
        event.preventDefault();
        const error1 = JoinCompClassNum(userClassNum);
        if (error1) {
            setClassNumError(error1);
        } else {
            setClassNumError("유효한 학번입니다.");
        }

        const error2 = JoinCompManager(userManager);
        if (error2) {
            setManagerError(error2);
        } else {
            setManagerError("유효한 이름입니다.")
        }

        const error3 = JoinCompAgency(userAgency);
        if (error3) {
            setAgencyError(error3);
        } else {
            setAgencyError("");
        }

        const error4 = JoinCompOffice(userOffice);
        if (error4) {
            setOfficeError(error4);
        } else {
            setOfficeError("");
        }

        const error5 = JoinCompPassword(userPass, userPassChk)
        if (error5) {
            setPasswordError(error5);
        } else {
            setPasswordError("비밀번호가 일치합니다.");
        }

        const error6 = JoinCompTel(userTelNum)
        if (error6) {
            setTelNumError(error6);
        } else {
            setTelNumError("");
        }
        
        return alert('회원가입 완료');

    }

    return (
        <form onSubmit = {ManageJoinSubmit}>
            <div className='register_site'>
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
                                        
                                    </div>
                                    <div className='join_formbottom'>
                                    <div className='join_mlabel1'>
                                            학번
                                        </div>
                                        <div className='join_minput1'>
                                            <input name='mclassnumber' className='join_mclassnumber' type='text' maxLength={9} value={userClassNum} onChange={(e) => setClassNum(e.target.value)}placeholder='학번을 입력하세요.'></input>
                                        </div>
                                        <div className='join_nclassnumerror'>
                                            {userClassNumError && <div>{userClassNumError}</div>}
                                        </div>
                                        <div className='join_mlabel2'>
                                            관리자 이름
                                        </div>
                                        <div className='join_minput2'>
                                            <input name='mname' className='join_mname' type='text' maxLength={20} value={userManager} onChange={(e) => setManager(e.target.value)}placeholder='이름을 입력하세요.'></input>
                                        </div>
                                        <div className='join_mnameerror'>
                                            {userManagerError && <div>{userManagerError}</div>}
                                        </div>
                                        <div className='join_mlabelst1'>
                                            이용기관 구분
                                        </div>
                                        <div className='join_mselect1'>
                                            <select name='magency' className='join_magency' value={userAgency} onChange={(e) =>  setAgency(e.target.value)} requir>
                                                <option value="magency0" selected>이용기관을 선택하세요.</option>
                                                <option value="magency1">대학 본부</option>
                                                <option value="magency2">대학 학생회</option>
                                            </select>
                                        </div>
                                        <div className='join_magencyerror'>
                                            {userAgencyError && <div>{userAgencyError}</div>}
                                        </div>
                                        <div className='join_mlabelst2'>
                                            이용기관 명
                                        </div>
                                        <div className='join_mselect2'>
                                            <input name='moffice' className='join_moffice' type='text' maxLength={30} value={userOffice} onChange={(e) => setOffice(e.target.value)} placeholder='이용기관을 입력하세요.'></input>
                                        </div>
                                        <div className='join_mofficeerror'>
                                            {userOfficeError && <div>{userOfficeError}</div>}
                                        </div>
                                        <div className='join_mlabel3'>
                                            비밀번호
                                        </div>
                                        <div className='join_minput3'>
                                            <input name='mpassword' className='join_mpassword' type='password' maxLength={20} value={userPass} onChange={(e) => setPass(e.target.value)} placeholder='비밀번호를 입력하세요.'></input>
                                        </div>
                                        <div className='join_minput3_1'>
                                            <input name='mpasswordchk' className='join_mpasswordchk' type='password' maxLength={20} value={userPassChk} onChange={(e) => setPassChk(e.target.value)} placeholder='비밀번호를 확인하세요.'></input>
                                        </div>
                                        <div className='join_npasswordchkerror'>
                                            {userPasswordError && <div>{userPasswordError}</div>}
                                        </div>
                                        <div className='join_mlabel4'>
                                            전화번호
                                        </div>
                                        <div className='join_minput4'>
                                            <input name='mnumber' className='join_mnumber' type='tel' maxLength={11} value={userTelNum} onChange={(e) => setTelNum(e.target.value)} placeholder='전화번호를 확인하세요.'></input>
                                        </div>
                                        <div className='join_ntelnumerror'>
                                            {userTelNumError && <div>{userTelNumError}</div>}
                                        </div>
                                        <button className='join_mbutton'>회원가입</button>
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
