import React, { useState } from "react";
import { Link } from "react-router-dom";
import './css.css';


function Viewvote({ data }) {

	console.log(data);

	return (
		<div>
			<div className="container">
				<div className="row col-12 mt-5">
					<h1 className="set_title ">투표 관리하기</h1>
					<div className="space-between"></div>
				</div>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>#</th>
							<th>제목</th>
							<th>투표 유형</th>
							<th>작성일</th>
						</tr>
					</thead>
					{data.map((item) => (
						<tbody key={item.id}>
							<tr>
								<td>{item.id + 1}</td>
								<td>
									<Link to={{ pathname: `/AdminMain/view/${item.id}` }}
										state={{ data: data }} style={{ textDecoration: "none", color: "black" }}
										className="board_wrap"
									>
										{item.title}
									</Link>
								</td>
								<td>{item.type}</td>
								<td>{item.startDate} - {item.endDate}</td>
							</tr>
						</tbody>

					))}
				</table>
			</div>
		</div>
	)
}

export default Viewvote;