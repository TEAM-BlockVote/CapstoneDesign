import React from 'react';
import './css.css';
import { useParams, useLocation } from 'react-router-dom';

function SetVote() {

	const { id } = useParams();
	const {state} = useLocation();
	console.log(state.data[id]);
	console.log(id);
	// console.log(data[id].text);


	return (
		<div className="container-fluid">
			<div className='row justify-content-md-center'>
				<div className="board_wrap col col-lg-12">
					<div className="board_title d-flex justify-content-center text-xl text-dark mt-3">
						<strong>진행중인 투표</strong>
					</div>
					<div className="board_view_wrap mx-5 mt-1 px-2 sm:p-6">
						<div>
							<div className="board_view rounded p-2">
								<div className="title d-flex justify-content-center">
									{state.data[id].title}
								</div>
								<div className="info">
									<dl>
										<dt>작성자</dt>
										<dd>{state.data[id].writer}</dd>
									</dl>
								</div>
								<div className="cont">
									<div>
										<table className="table">
											<tbody>
												<tr align="center">
													<td>후보</td>
													<td colSpan="2" rowSpan="3">
														<div className="form-floating2">
															<ul>
															<li>{state.data[id].text}</li>
															</ul>
														</div>
													</td>
												</tr>
												<tr align="center">
													<td>
														{/* <img src={data[id].photo} className='dummy_photo'/> */}
													</td>
												</tr>
												<tr align="center" className="text_wid">
													<td>{state.data[id].name}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div className="bt_wrap">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SetVote;