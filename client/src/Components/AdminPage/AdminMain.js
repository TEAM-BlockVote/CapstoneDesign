import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Makevote from './Makevote';
import Viewvote from './Viewvote';
import Tab from '../Main/Tab';
import AuthContext from '../../Store/auth-context';

const AdminMain = () => {
  const [content, setContent] = useState(<Makevote />);
  const [selectedTab, setSelectedTab] = useState(<Tab index={0} />);
  const [activeIndex, setActiveIndex] = useState(0);
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (ctx.isLoggedIn === false) {
      navigate("/");
      alert("로그인 후 이용해 주세요");
    }
  }, [ctx.isLoggedIn, navigate]);

  function MakevoteClick(tab, index) {
    setContent(<Makevote/>);
    setSelectedTab(tab);
    setActiveIndex(index);
  }

  function setViewClick(tab, index) {
    setContent(<Viewvote/>);
    setSelectedTab(tab);
    setActiveIndex(index);
  }

  return ctx.isLoggedIn === false || ctx.isLoggedIn === null ? null : (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="tab-wrapper">
            <ul className="tabs-list col-12">
              <li className={activeIndex === 0 ? 'tab active2' : 'tab2'} onClick={() => MakevoteClick(<Tab index={0} />, 0)}>투표 만들기</li>
              <li className={activeIndex === 1 ? 'tab active2' : 'tab2'} onClick={() => setViewClick(<Tab index={1} />, 1)}>투표 목록</li>
            </ul>
          </div>
        </div>
      </div>
      {content}
    </div>
  )
}

export default AdminMain;
