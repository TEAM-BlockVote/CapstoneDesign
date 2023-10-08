import { useState } from "react";
import { useZxing } from "react-zxing";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

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
    <div>
      <video ref={ref} />
      <Modal show={showVotingModal} onHide={handleVotingModalClose} centered style={{ textAlign: 'center' }}>
        <Modal.Body>
          <form>
            <div>
            {user &&
                <div>
                  <p> {user.dep} </p>
                  <p> {user.name} </p>
                  <p> {user.studentNumber} </p>
                  <p> {user.telNumber} </p>
                  <div> 이벤트에 참여 하시겠습니까? </div>
                </div>
              }
              <button type='button' onClick={() => { alert("투표 용지 받아가세요~"); handleVotingModalClose(); setPaused(true)}}>
                예
              </button>
              <button type='button' onClick={() => { handleVotingModalClose(); setPaused(false)}}>
                아니요
              </button>
            </div>
          </form>
          
        </Modal.Body>
      </Modal>
      
    </div>
  );
};

export default QRcodeScanner;
