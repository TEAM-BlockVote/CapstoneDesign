import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import logo from '../Main/images/logo.png';
import AuthContext from '../../Store/auth-context';
import './NavigationBar.css';

import { useState } from 'react';

import InfoModal from './InfoModal';

const Header = () => {
  const ctx = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ margin: '0 5%' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img className="navbar-logo" src={logo} alt="seoilLogo" /></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ marginLeft: 'auto', marginRight: '1rem' }}
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
                <Link className="nav-link" to="/Nawoo"> 나만의 후보찾기 </Link>
              </li>
            </ul>
            <ul className="navbar-nav account">
              <li className="nav-item">
                {ctx.isLoggedIn === null && " "}
                {ctx.isLoggedIn === false && <Link className="nav-link" to="/signIn"> 로그인 </Link>}
              </li>
            </ul>
          </div>
          {ctx.isLoggedIn === true && (
            <div className="navbar-nav" onClick={showModal}>
              {ctx.userName}님
            </div>
          )}
        </div>
      </nav>
      <div>
        {modalOpen && <InfoModal setModalOpen={setModalOpen} />}
      </div>
    </div>
  );
};

export default Header;
