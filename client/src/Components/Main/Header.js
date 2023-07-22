import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import logo from '../Main/images/logo.png';
import AuthContext from '../../Store/auth-context';

import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';

import { useState } from 'react';

const Header = () => {
  const ctx = useContext(AuthContext);
  const [showVotingModal, setShowVotingModal] = useState(false);
  const handleVotingModalClose = () => setShowVotingModal(false);
  const handleVotingModalShow = () => setShowVotingModal(true);

  return (
    <>
    <nav className="navbar navbar-expand-lg" style={{margin: '0 5%'}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><img  style={{width:'200px'}} src={logo} alt="seoilLogo"/></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{marginLeft: 'auto', marginRight: '1rem'}}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-start" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
            <li className="nav-item me-5">
              <Link className="nav-link" to="/AdminMain"> 투표 만들기 </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/notice">  QnA </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="/NawooPage"> 나만의 후보찾기 </Link>
            </li>
          </ul>
          <ul className="navbar-nav account">
            <li className="nav-item">
              { ctx.isLoggedIn === null && " " }
              { ctx.isLoggedIn === false && <Link className="nav-link" to="/signIn"> 로그인 </Link> }
            </li>
          </ul>
        </div>
        { ctx.isLoggedIn === true && (
          <div className="navbar-nav" onClick={handleVotingModalShow} style={{cursor:'pointer', color: '#0084ff'}}>
            {ctx.userName}님
          </div>
        )}
        </div>
      
    </nav>

    <Modal  show={showVotingModal} onHide={handleVotingModalClose}>
      <Modal.Header>
        <CloseButton onClick={handleVotingModalClose} />
      </Modal.Header>
      <Modal.Body>
      { ctx.isLoggedIn === true && <div className="nav-link" onClick={ctx.logout} style={{cursor:'pointer'}}> 로그아웃 </div> }
      </Modal.Body>
    </Modal>
  </>    
  );
};

export default Header;
