import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import seoilLogo from '../Main/images/seoilBlue.png';
import AuthContext from '../../Store/auth-context';

const Header = () => {
  const ctx = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-md">
        <Link className="navbar-brand" to="/"><img  style={{width:50+'px', height: 50+'px'}} src={seoilLogo} alt="seoilLogo"/></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
            <li className="nav-item me-5">
              <Link className="nav-link" to="/AdmainMain"> 투표 만들기 </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notice">  QnA </Link>
            </li>
          </ul>
          <ul className="navbar-nav account">
            <li className="nav-item">
              { ctx.isLoggedIn ?  <div className="nav-link" onClick={ctx.logout}> 로그아웃 </div> : <Link className="nav-link" to="/signIn"> 로그인 </Link> }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
