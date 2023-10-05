import {useState } from "react";
import { useContext } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; 
import AuthContext from '../../Store/auth-context';
import img from './images/face.png';
import './InfoModal.css';

function InfoModal(props) {
  const ctx = useContext(AuthContext);
  const [profile, setProfile] = useState(<img src={img} alt='profile'/>);
  const [name, setName] = useState(<div className='modal_name'>{ctx.userName}님</div>);

  const closeModal = () => {
    props.setModalOpen(false);
  };

  const handleSetProfile = () => {
    setProfile(<img src={img} alt='profile'/>);
    setName(<div className='modal_name'>{ctx.userName}님</div>);
  }
  return (
      <div className="modal_container">
        <div className="modal_header">
          <button className="close" onClick={closeModal}> X </button>
          <span className='modal_profile'> 내 프로필 </span>
        </div>

        <div className="modal_body">
          <div className='modal_img'>
            { profile }
          </div>
          { name }
        </div>
        <div className='modal_buttons'>
          <p className='modal_button_blue' onClick={() => {
            setProfile(<QRCodeCanvas size={114} value={ctx.studentNumber} onClick={ handleSetProfile }/>)
            setName(<div className='modal_name'>({ctx.studentNumber})</div>);
          }}>
            학번QR코드
          </p>
          <p className='modal_button_white' onClick={() => {
            setProfile(<QRCodeCanvas size={114} value={ctx.walletAddr} onClick={ handleSetProfile }/>)
            setName(<div className='modal_name'>{ctx.etherBalance} ETH</div>);
          }}>
            블록체인계정
          </p>
        </div>
        <div className="modal_footer" onClick={() => { ctx.logout();closeModal(); }}>
          <span className="modal_footer_logout" > 로그아웃</span>
        </div>
      </div>
  );
}
export default InfoModal;