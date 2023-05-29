import React, { useState } from "react";

export function VotePlus() {

	const [voteText, setVoteText] = useState("");
	const [voteName, setVoteName] = useState("");

	return (
		<div>
			<table className="table">
				<tbody>
					<tr align="center">
						<td>후보</td>
						<td colSpan="2" rowSpan="3">
							<div className="form-floating">
								<textarea className="form-floating col-12" value={voteText} onChange={(e) => setVoteText(e.target.value)} placeholder="후보자 공략을 입력하세요."></textarea>
							</div>
						</td>
					</tr>
					{/* <tr align="center">
						<td><input type="file" className="form-control" id="photo" name="photo" style={{ display: "none" }} required />
							<input type="button" value="사진 추가" onClick={() => document.getElementById('photo').click()} />
						</td>
					</tr> */}
					<tr align="center" className="text_wid">
						<td><input className="form-control w-75" type="text" value={voteName} onChange={(e) => setVoteName(e.target.value)} placeholder="후보자 이름 입력"/></td>
					</tr>
				</tbody>
			</table>
		</div>
	)

}


export default VotePlus;