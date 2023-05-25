import React from 'react';
import './css.css';
import { useParams, useLocation } from 'react-router-dom';

function SetVote() {

	// const data = [
	// 	{
	// 		id: 0,
	// 		writer: "김철수",
	// 		title: "투표 1",
	// 		name: "전준호",
	// 		type: " 찬반 투표 ",
	// 		startDate: "2023-03-05",
	// 		endDate: "2023-07-25",
	// 		photo: man1,
	// 		text: "학교 화장실 시설 개선",
	// 		// text2: "카톡 플러스 친구 개설",
	// 		// text3: "도서관 야간 개방",
	// 		// text4: "학생회비 사용 영수증 공개",
	// 		// text5: "무인 프린터기 개선"
	// 	},
	// 	{
	// 		id: 1,
	// 		writer: "김영희",
	// 		title: "투표 2",
	// 		name: "이서진",
	// 		type: "선택 투표 ",
	// 		startDate: "2023-03-07",
	// 		endDate: "2023-06-28",
	// 		photo: man2,
	// 		text: "학교 축제에 최예나 섭외",
	// 		// text2: "카톡 플러스 친구 개설",
	// 		// text3: "도서관 야간 개방",
	// 		// text4: "학생회비 사용 영수증 공개",
	// 		// text5: "무인 프린터기 개선"
	// 	},
	// 	{
	// 		id: 2,
	// 		writer: "김민수",
	// 		title: "투표 3",
	// 		name: "유승민",
	// 		type: "선택 투표 ",
	// 		startDate: "2023-10-07",
	// 		endDate: "2023-12-28",
	// 		photo: man3,
	// 		text: "학교 도셔관 책 다양화",
	// 		// text2: "카톡 플러스 친구 개설",
	// 		// text3: "도서관 야간 개방",
	// 		// text4: "학생회비 사용 영수증 공개",
	// 		// text5: "무인 프린터기 개선"
	// 	},
	// 	{
	// 		id: 3,
	// 		writer: "김정은",
	// 		title: "투표 4",
	// 		name: "나윤성",
	// 		type: "찬반 투표 ",
	// 		startDate: "2023-01-07",
	// 		endDate: "2023-11-30",
	// 		photo: man4,
	// 		text: "학교 운동장 잔디 설치",
	// 		// text2: "카톡 플러스 친구 개설",
	// 		// text3: "도서관 야간 개방",
	// 		// text4: "학생회비 사용 영수증 공개",
	// 		// text5: "무인 프린터기 개선"
	// 	}
	// ];


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
															{/* <li>{data[id].text2}</li>
															<li>{data[id].text3}</li>
															<li>{data[id].text4}</li>
															<li>{data[id].text5}</li> */}
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