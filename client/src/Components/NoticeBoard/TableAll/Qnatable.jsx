import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Qnatable.css';
import WritingForm from '../WriteAll/WritingForm';

function Qnatable() {
  const [showWritingForm, setShowWritingForm] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();

  const qnaDataDummy = [

    {
      no: 1,
      name: '작성자',
      title: '질문 2',
      date: '2023-4-8',
      content:
        '백년전쟁(1337-1453)은 영국과 프랑스의 100년간의 전쟁이었다. 이전의 영국 왕들이 프랑스 왕좌에 대한 공격을 계속 시도하면서 시작되었다.',
      view: 6,
    },
    {
      no: 2,
      name: '작성자',
      title: '질문 3',
      date: '2023-4-8',
      content:
        '백년전쟁(1337-1453)은 영국과 프랑스의 100년간의 전쟁이었다. ',
      view: 44,
    },
    {
      no: 3,
      name: '작성자',
      title: '질문 4',
      date: '2023-4-8',
      content:
        '백년전쟁(1337-1453)은 영국과 프랑스의 100년간의 전쟁이었다. 이전의 영국 왕들이 프랑스 왕좌에 대한 공격을 계속 시도하면서 시작되었다.',
      view: 223,
    },
  ];

  const [writer, setWriter] = useState(qnaDataDummy);
  const [content, setContent] = useState('');

  const addPostToTable = (newPost) => {
    setWriter((prevPosts) => [...prevPosts, newPost]);
  };

  const handleWriteClick = () => {
    setShowWritingForm(true);
  };

  const handleFormCancel = () => {
    setShowWritingForm(false);
  };

  const handlePostClick = (postId) => {
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
        <WritingForm addPostToTable={addPostToTable} postCount={writer.length} />
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
          {content}
        </>
      )}
    </>
  );
}

export default Qnatable;







