import React, { useState } from "react";

function VotePlus() {
  const [voteText, setVoteText] = useState("");
  const [voteName, setVoteName] = useState("");


  return (
    <div style={{ textAlign: 'center', padding: '5%', backgroundColor: '#f3f3f3', marginBottom: '5%' }}>
      <div>
        <input type="text" value={voteName} onChange={(e) => setVoteName(e.target.value)} placeholder="후보자 이름 입력" />
      </div>
      <br />
      <div>
        <input type="button" value="사진 추가" />
      </div>
      <br />
      <textarea className="form-floating col-12" value={voteText} onChange={(e) => setVoteText(e.target.value)} placeholder="후보자 공략을 입력하세요."></textarea>
    </div>
  );
}

export default VotePlus;
