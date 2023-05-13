import React, { useState } from "react";
import "./Pagination.css";

function Pagination() {
  const [activePage, setActivePage] = useState(1);

  const handleClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <div className="pageCh" >
        <nav aria-label="pageChange">
          <ul className="pagination">
            <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
              <a className="page-link" href="javascript:void(0)" onClick={() => handleClick(activePage - 1)}>Previous</a>
            </li>
            <li className={`page-item ${activePage === 1 ? 'active' : ''}`}><a className="page-link" href="javascript:void(0)" onClick={() => handleClick(1)}>1</a></li>
            <li className={`page-item ${activePage === 2 ? 'active' : ''}`}><a className="page-link" href="javascript:void(0)" onClick={() => handleClick(2)}>2</a></li>
            <li className={`page-item ${activePage === 3 ? 'active' : ''}`}><a className="page-link" href="javascript:void(0)" onClick={() => handleClick(3)}>3</a></li>
            <li className={`page-item ${activePage === 3 ? 'disabled' : ''}`}>
              <a className="page-link" href="javascript:void(0)" onClick={() => handleClick(activePage + 1)}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
      <footer className="footer">
      <div className="container">
        <span className="text-muted">02192 서울특별시 중랑구 용마산로 90길 28 TEL 02.490.7300  COPYRIGHTⓒ2017 SEOIL UNIVERSITY ALL RIGHT RESERVED</span>
      </div>
    </footer>
    </>
  
  );

}



export default Pagination;
