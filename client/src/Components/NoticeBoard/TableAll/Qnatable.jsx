import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Qnatable.css";
import WritingForm from '../WriteAll/WritingForm';

function Qnatable() {
  const [writer, setWriter] = useState([]);
  const [showWritingForm, setShowWritingForm] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate(); // useNavigate import 추가
  
  const addPostToTable = (newPost) => {
    setWriter([...writer, newPost]);
    setShowWritingForm(false); // 글 작성 완료 후 폼 숨기기
  };

  const handleWriteClick = () => {
    setShowWritingForm(true);
  };

  const handleFormCancel = () => {
    setShowWritingForm(false);
  };
  
  const handlePostClick = (postId) => {
    // 게시물 상세 페이지로 이동하는 로직 작성
    navigate(`/post/${postId}`);
  };

  const handleClick = (page) => {
    setActivePage(page);
    // 페이지 변경에 대한 로직 추가
  };

  return (
    <>
      {!showWritingForm && (
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
            {writer.map((item, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/post/${item.no}`} onClick={() => handlePostClick(item.no)}>
                    {item.title}
                  </Link>
                </td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.view}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showWritingForm ? (
        <WritingForm addPostToTable={addPostToTable} />
      ) : (
        <>
          <div>
            <button onClick={handleWriteClick} className="btn btn-default btn-write">
              글 작성하기
            </button>
          </div>
          <div className="qna-pageCh">
            <nav aria-label="qna-pageChange">
              <ul className="qna-pagination">
                <li className={`qna-page-item ${activePage === 1 ? "disabled" : ""}`}>
                  <a className="qna-page-link" href="javascript:void(0)" onClick={() => handleClick(activePage - 1)}>
                    Previous
                  </a>
                </li>
                <li className={`qna-page-item ${activePage === 1 ? "active" : ""}`}>
                  <a className="page-link" href="javascript:void(0)" onClick={() => handleClick(1)}>
                    1
                  </a>
                </li>
                <li className={`qna-page-item ${activePage === 2 ? "active" : ""}`}>
                  <a className="page-link" href="javascript:void(0)" onClick={() => handleClick(2)}>
                    2
                  </a>
                </li>
                <li className={`qna-page-item ${activePage === 3 ? "active" : ""}`}>
                  <a className="page-link" href="javascript:void(0)" onClick={() => handleClick(3)}>
                    3
                  </a>
                </li>
                <li className={`qna-page-item ${activePage === 3 ? "disabled" : ""}`}>
                  <a className="qna-page-link" href="javascript:void(0)" onClick={() => handleClick(activePage + 1)}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

export default Qnatable;


