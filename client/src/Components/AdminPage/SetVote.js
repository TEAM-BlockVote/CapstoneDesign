import React from 'react';
import './css.css';
import { useLocation } from 'react-router-dom';

function SetVote() {
	const { state } = useLocation();

	return (
		<>
			<form>
				<div className="container">
					<div className="row mt-5" >
						<div className="col col-md-12">
							<h1 className="set_title">진행중인 투표</h1>
						</div>
						<div className="space-between"></div>
						<div className="board_view_wrap">
							<div className="board_view">
								<div className="title">
									{state.data.title}
								</div>
								<div className="info">
									<div className='row'>
										<div className='col-6'>
											<dl>
												<dt>번호</dt>
												<dd>{state.data.id}</dd>
											</dl>
										</div>
										<div className='col-6'>
											<dl>
												<dt>글쓴이</dt>
												<dd>{state.data.writer}</dd>
											</dl>
										</div>
									</div>
									<div className='row'>
										<div className='col-6'>
											<dl>
												<dt>투표 유형</dt>
												<dd>{state.data.type}</dd>
												<br />
											</dl>
										</div>
										<div className='col-6'>
											<dl>
												<dt>투표 기간</dt>
												<dd>{state.data.startDate} - {state.data.endDate}</dd>
											</dl>
										</div>
									</div>
								</div>
								<div className="cont">
									<table className="set_table">
										<thead className='man_top'>
											<tr>
												<th>후보자</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>{state.data.name}</td>
											</tr>
											<tr>
												<td className='man_text'>
													<ul>
														<li>{state.data.text}</li>
														<li>{state.data.text}</li>
														<li>{state.data.text}</li>
													</ul>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							{/* <div className="bt_wrap">
									<a href="list.html" className="on">목록</a>
									<a href="edit.html">수정</a>
								</div> */}
						</div>
					</div>
				</div>
			</form >
		</>
	);
}

export default SetVote;
