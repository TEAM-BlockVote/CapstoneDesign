import React, { useState } from "react";

function Pagination() {
  const [activePage, setActivePage] = useState(1);

  const handleClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <div className="pageCh" style={{ marginTop: "2rem", marginBottom: "4rem" }}>
        <nav aria-label="pageChange" style={{ display: "flex", justifyContent: "center" }}>
          <ul className="pagination" style={{ margin: 0, padding: 0 }}>
            <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`} style={{ marginRight: '1rem' }}>
              <a className="page-link" href="javascript:void(0)" onClick={() => handleClick(activePage - 1)}>Previous</a>
            </li>
            <li className={`page-item ${activePage === 1 ? 'active' : ''}`} style={{ marginRight: '1rem' }}><a className="page-link" href="javascript:void(0)" onClick={() => handleClick(1)}>1</a></li>
            <li className={`page-item ${activePage === 2 ? 'active' : ''}`} style={{ marginRight: '1rem' }}><a className="page-link" href="javascript:void(0)" onClick={() => handleClick(2)}>2</a></li>
            <li className={`page-item ${activePage === 3 ? 'active' : ''}`} style={{ marginRight: '1rem' }}><a className="page-link" href="javascript:void(0)" onClick={() => handleClick(3)}>3</a></li>
            <li className={`page-item ${activePage === 3 ? 'disabled' : ''}`}>
              <a className="page-link" href="javascript:void(0)" onClick={() => handleClick(activePage + 1)}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Pagination;
