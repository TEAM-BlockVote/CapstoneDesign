import React, { useState, useEffect } from "react";
import Loding from "../Main/Loding";
import { Link } from "react-router-dom";
import axios from 'axios';
import './css.css';

function Viewvote() {
  const [voteList, setVoteList] = useState('');
  useEffect(() => {
    axios.get('/vote/view')
      .then((res) => {
        setVoteList(res.data);
      })
      .catch((err) => {
        setVoteList("404");
      })
  }, []);

  if(!voteList) {
    return <Loding/>
  }

	return (
    <div className="container">
      <div className="row col-12 mt-5">
        <h1 className="set_title">투표 목록</h1>
        <div className="space-between"></div>
      </div>
      <div className="table-responsive rounded-top text-center">
        <table className="table table-hover table-bordered shadow rounded">
          <thead className="table_thread">
            <tr className="shadow rounded">
              <th>번호</th>
              <th>제목</th>
              <th>투표 유형</th>
              <th>작성일</th>
              <th>투표코드</th>
            </tr>
          </thead>
          <tbody className="table_body">
            {voteList === "404" ? "" : voteList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <Link to={{ pathname: `/AdminMain/view/${item.id}` }}
                    state={{ data: item }} style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {item.title}
                  </Link>
                </td>
                <td>{item.type}</td>
                <td>{item.makeDate}</td>
                <td>{item.voteCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
	)
}

export default Viewvote;
