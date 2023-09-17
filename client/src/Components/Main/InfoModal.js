import './InfoModal.css';
import img from './images/face.png';
import { useContext } from 'react';
import AuthContext from '../../Store/auth-context';

function InfoModal(props) {
  const ctx = useContext(AuthContext);

  const closeModal = () => {
    props.setModalOpen(false);
  };

  return (
      <div className="modal_container">
        <div className="modal_header">
          <button className="close" onClick={closeModal}> X </button>
          <span className='modal_profile'> 내 프로필 </span>
        </div>

        <div className="modal_body">
          <div className='modal_img'>
            <img src={img} alt='profile'/>
            </div>
          <div className='modal_name'>{ctx.userName}님</div>
        </div>
        <div className='modal_buttons'>
          <p className='modal_button_blue'>학번QR코드</p>
          <p className='modal_button_white'>블록체인계정</p>
        </div>
        <div className="modal_footer" onClick={() => { ctx.logout();closeModal(); }}>
          <span className="modal_footer_logout" > 로그아웃</span>
        </div>
      </div>
  );
}
export default InfoModal;