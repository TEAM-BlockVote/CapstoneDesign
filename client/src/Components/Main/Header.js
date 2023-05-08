const Header = () => {
  return(
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">LOGO</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto" >
            <li className="nav-item me-5">
              <a className="nav-link" href="#">메인화면</a> 
            </li>
            <li className="nav-item me-5">
              <a className="nav-link" href="#">나만의 후보 찾기</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">QnA</a>
            </li>
          </ul>
          <ul className="navbar-nav account">
            <li className="nav-item">
              <a className="nav-link" href="#">관리자 회원가입</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">로그인</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;