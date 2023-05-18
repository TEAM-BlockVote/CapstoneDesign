import React, { useState } from "react";
import { Link } from "react-router-dom";
import './css.css';


function Viewvote({data}) {

	console.log(data);

	return (
		<div>
			{data.map((item) => (  
				<Link key={item.id} to={{pathname:`/AdminMain/view/${item.id}`}} state={{data:data}} style={{ textDecoration: "none", color:"black" }}className="board_wrap" >
					<div className="board_view_wrap">
						<div className="board_view">
							<div className="vote_title">
								<h2>{item.title}</h2>
							</div>
							<div className="info">
								<dl>
									<dt>투표 기간</dt>
									<dd>{item.startDate} - {item.endDate}</dd>
								</dl>
								<dl>
									<dt>투표 유형</dt>
									<dd>{item.type}</dd>
								</dl>
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}

export default Viewvote;