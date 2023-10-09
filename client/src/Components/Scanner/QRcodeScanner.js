import { useState } from "react";
import { useZxing } from "react-zxing";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './QRcodeScanner.css'

const QRcodeScanner = () => {
  const [user, setUser] = useState(null);
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [paused, setPaused] = useState(false);
  const handleVotingModalClose = () => setShowVotingModal(false);
  const handleVotingModalShow = () => setShowVotingModal(true);
  const { ref } = useZxing({
    paused: paused,
    onDecodeResult(result) {
      handleUserInfoFetch(result.getText());
    },
  });

  const handleUserInfoFetch = async (studentNumber) => {
    if(studentNumber.length === 9) {
      try {
        const user = await axios.get(`/scan/user/${studentNumber}`);
        setUser(user.data);
        handleVotingModalShow();
        setPaused(true);
        
      } catch (error) {
        alert("학생 정보가 없습니다 관리자에게 문의해주세요");
      }
    }
  }

  return (
    <div className="scanner_wrapper">
      <div className="qr_div">
        <h2 className="qr_title">기표</h2>
        <video className="qr_user" ref={ref} />
      </div>
      <Modal show={showVotingModal} onHide={handleVotingModalClose} centered>
        <Modal.Body>
          <form>
            <div className="modal_div">
            {user &&
                <div className="modal_info">
                  <p> 학과: {user.dep} </p>
                  <p> 이름: {user.name} </p>
                  <p> 학번: {user.studentNumber} </p>
                  <p> 전화번호: {user.telNumber} </p>
                  <div> 이벤트에 참여 하시겠습니까? </div>
                </div>
              }
            <div className="modal_button">
                <button className='candidate-info-modal' type='button' onClick={() => { alert("투표 용지 받아가세요~"); handleVotingModalClose(); setPaused(true)}} style={{backgroundColor: 'rgb(251, 126, 117)'}}>
                  예
                </button>
                <button className='candidate-info-modal' type='button' onClick={() => { handleVotingModalClose(); setPaused(false)}}>
                  아니요
                </button>
              </div>
            </div>
          </form>
          
        </Modal.Body>
      </Modal>
      
    </div>
  );
};

export default QRcodeScanner;
