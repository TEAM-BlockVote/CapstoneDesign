import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Qnatable.css";


function Qnatable() {
  const writer = [
    {
      no: 2221,
      title: "안녕하세여",
      name: "전주노",
      date: "2023.5.8",
      view: 80,
    },
    {
      no: 2222,
      title: "안녕하세여",
      name: "전주노",
      date: "2023.5.8",
      view: 80,
    },
    {
      no: 2223,
      title: "안녕하세여",
      name: "전주노",
      date: "2023.5.8",
      view: 80,
    },
    {
      no: 2224,
      title: "안녕하세여",
      name: "전주노",
      date: "2023.5.8",
      view: 80,
    },
    {
      no: 2225,
      title: "제목5",
      name: "이름5",
      date: "2023.5.12",
      view: 120,
    }
  ];

  const [activePage, setActivePage] = useState(1);

  const handleClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <table className="qnatable-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody className="table-body qnatable-table">
          {writer.map((item) => (
            <tr key={item.no}>
              <td>{item.no}</td>
              <td>
<<<<<<< Updated upstream
                <Link to={`/post/${item.no}`}>
                  {item.title}
                </Link>
              </td>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.view}</td>
=======
              <Link to={`/post/${post.id}`} onClick={() => handlePostClick(post.id)}>
                {post.title}
              </Link>

              </td>
              <td>{post.name}</td>
              <td>{post.date}</td>
              <td>{post.view}</td>
>>>>>>> Stashed changes
            </tr>
          ))}
        </tbody>
        <tr>
          <td colSpan="5">
            <hr />
          </td>
        </tr>
      </table>

      <div className="qna-pageCh">
        <nav aria-label="qna-pageChange">
          <ul className="qna-pagination">
            <li className={`qna-page-item ${activePage === 1 ? 'disabled' : ''}`}>
              <a className="qna-page-link" href="javascript:void(0)" onClick={() => handleClick(activePage - 1)}>Previous</a>
            </li>
            <li className={`qna-page-item ${activePage === 1 ? 'active' : ''}`}><a className="page-link" href="javascript:void(0)" onClick={() => handleClick(1)}>1</a></li>
            <li className={`qna-page-item ${activePage === 2 ? 'active' : ''}`}><a className="page-link" href="javascript:void(0)" onClick={() => handleClick(2)}>2</a></li>
            <li className={`qna-page-item ${activePage === 3 ? 'active' : ''}`}><a className="page-link" href="javascript:void(0)" onClick={() => handleClick(3)}>3</a></li>
            <li className={`qna-page-item ${activePage === 3 ? 'disabled' : ''}`}>
              <a className="qna-page-link" href="javascript:void(0)" onClick={() => handleClick(activePage + 1)}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Qnatable;
