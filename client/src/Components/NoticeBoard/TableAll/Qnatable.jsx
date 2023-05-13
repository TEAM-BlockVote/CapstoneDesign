import React from "react";
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
      title: "제목2",
      name: "이름2",
      date: "2023.5.9",
      view: 120,
    },
    {
      no: 2223,
      title: "제목3",
      name: "이름3",
      date: "2023.5.10",
      view: 50,
    },
    {
      no: 2224,
      title: "제목4",
      name: "이름4",
      date: "2023.5.11",
      view: 90,
    },
    {
      no: 2225,
      title: "제목5",
      name: "이름5",
      date: "2023.5.12",
      view: 200,
    },
    {
      no: 2226,
      title: "제목6",
      name: "이름6",
      date: "2023.5.13",
      view: 30,
    },
  ];

  return (
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
              <Link to={`/post/${item.no}`}>
                {item.title}
              </Link>
            </td>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td>{item.view}</td>
          </tr>
        ))}
      </tbody>
      <tr>
        <td colSpan="5">
          <hr />
        </td>
      </tr>
    </table>
  );
}

export default Qnatable
