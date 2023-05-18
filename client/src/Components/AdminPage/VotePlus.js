import React, { useState } from "react";

export function VotePlus() {

	return (
		<div>
			<table className="table">
				<tbody>
					<tr align="center">
						<td>후보</td>
						<td colSpan="2" rowSpan="3">
							<div className="form-floating">
								<textarea className="form-floating col-12" id="text" placeholder="후보자 공략을 입력하세요." required></textarea>
							</div>
						</td>
					</tr>
					{/* <tr align="center">
						<td><input type="file" className="form-control" id="photo" name="photo" style={{ display: "none" }} required />
							<input type="button" value="사진 추가" onClick={() => document.getElementById('photo').click()} />
						</td>
					</tr> */}
					<tr align="center" className="text_wid">
						<td><input className="form-control w-75" id="name" type="text" placeholder="후보자 이름 입력" required /></td>
					</tr>
				</tbody>
			</table>
		</div>
	)

}


export default VotePlus;