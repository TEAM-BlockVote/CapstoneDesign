import React, { useState } from "react";
import { Link } from "react-router-dom";
import './css.css';


function Viewvote({ data }) {

	console.log(data);

	return (
		<div>
			<div className="container">
				<div className="row col-12 mt-5">
					<h1 className="set_title">투표 관리하기</h1>
					<div className="space-between"></div>
				</div>
				<div className="table-responsive rounded-top text-center">
						<table className="table table-hover table-bordered shadow rounded">
							<thead className="table_thread">
								<tr className="shadow rounded">
									<th>#</th>
									<th>제목</th>
									<th>투표 유형</th>
									<th>작성일</th>
								</tr>
							</thead>
							<tbody className="table_body">
								{data.map((item) => (
									<tr key={item.id}>
										<td>{item.id}</td>
										<td>
											<Link to={{ pathname: `/AdminMain/view/${item.id}` }}
												state={{ data: item }} style={{ textDecoration: 'none', color: 'inherit' }}
												className=""
											>
												{item.title}
											</Link>
										</td>
										<td>{item.type}</td>
										<td>{item.startDate} - {item.endDate}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
		</div>
	)
}

export default Viewvote;
