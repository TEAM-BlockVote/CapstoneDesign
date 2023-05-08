import React from "react";
import { Link } from "react-router-dom";

function Qnatable() {
  let writer = [{
    no: 2221,
    title: "안녕하세여",
    name: "전주노",
    date: "2023.5.8",
    view: 80
  }]
  return (
    
    <table className="table table-hover" style={{ width: "70%", height: "500px", margin: "auto", verticalAlign: "middle"}}>


      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody className="table-body">
        <tr>
          <td>{writer[0].no}</td>
          <td>
          <Link to="/post1" style={{ textDecoration: "none" }}>{writer[0].title}</Link>
          </td>
          <td>{writer[0].name}</td>
          <td>{writer[0].date}</td>
          <td>3</td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <Link to="/post2" style={{ textDecoration: "none" }}>선거 공약 2 관련 질문</Link>
          </td>
          <td>이서진</td>
          <td>2023.5.5</td>
          <td>3</td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <Link to="/post3" style={{ textDecoration: "none" }}>선거 공약 3 관련 질문</Link>
          </td>
          <td>이서진</td>
          <td>2023.5.5</td>
          <td>3</td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            <Link to="/post4" style={{ textDecoration: "none" }}>선거 공약 1 관련 질문</Link>
          </td>
          <td>이서진</td>
          <td>2023.5.5</td>
          <td>3</td>
        </tr>
        <tr>
          <td>5</td>
          <td>
            <Link to="/post5" style={{ textDecoration: "none" }}>선거 공약 3 관련 질문</Link>
          </td>
          <td>이서진</td>
          <td>2023.5.5</td>
          <td>3</td>
        </tr>
      </tbody>
     
        <tr>
          <td colSpan="5">
            <hr />
          </td>
        </tr>
     
    </table>
   
  );
}

export default Qnatable;
