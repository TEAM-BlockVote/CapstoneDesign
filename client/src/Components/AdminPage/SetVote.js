import React from 'react';
import './css.css';
import { useParams, useLocation } from 'react-router-dom';

function SetVote() {
	const { id } = useParams();
	const { state } = useLocation();
	console.log(state.data);
	console.log(id);
	// console.log(data.text);

	return (
		<>
			<form>
				<div className="container">
					<div className="row mt-5" >
						<div className="col col-md-12">
							<h1 className="set_title">진행중인 투표</h1>
						</div>
						<div className="space-between"></div>
						<div className="col-12 col-md-8 offset-md-2">
							<div className="board_view">
								<div className="title d-flex justify-content-center">
									{state.data.title}
								</div>
								<div className="info">
									<dl>
										<dt>작성자</dt>
										<dd>{state.data.writer}</dd>
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
																<li>{state.data.text}</li>
																<li>{state.data.text}</li>
																<li>{state.data.text}</li>
															</ul>
														</div>
													</td>
												</tr>
												<tr align="center">
													<td>
														{/* <img src={data.photo} className='dummy_photo'/> */}
													</td>
												</tr>
												<tr align="center" className="text_wid">
													<td>{state.data.name}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}

export default SetVote;
