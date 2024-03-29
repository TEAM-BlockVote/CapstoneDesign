import React from "react";
import "./QnaMain.css";
import blockImage from "../HomePage/images/blockchain.png"

// 후보자 목록 아이템 컴포넌트
function CandidateListItem({ id, name }) {
  const linkHref = `/candidate/${id}`; //후보자별 qna 게시판 위치

  return (
    <li>
      <a href={linkHref} id="candidate_qna">
        후보 {id}
      </a>
    </li>
  );
}

const candidates = [
  { id: 1},
  { id: 2},
  { id: 3}
];


function QTableItem({ title, author, date, views }) { // 컴포넌트
  return (
    <div id="q_table">
      <div id="q_question">
        <div id="q_title">
          <a href="#">{title}</a>
        </div>
        <div id="q_name_date">
          {author} * {date}
        </div>
      </div>
      <div id="q_view">
        <div id="q_viewnum">{views}</div>
        <div id="q_views">조회</div>
      </div>
    </div>
  );
}

const qTableData = [
  {
    title: "도서관 시설 개선에 대해 질문 드립니다.",
    author: "홍길동",
    date: "2023.05.17",
    views: 23,
  },
  {
    title: "부학회장 후보님께 질문 드립니다.",
    author: "전준호",
    date: "2023.06.03",
    views: 142,
  },
  {
    title: "운동장 잔디밭 관련 질문 드립니다.",
    author: "유승민",
    date: "2023.05.24",
    views: 213,
  },
  {
    title: "우리 학교 축제 공약에 대해 질문 드립니다.",
    author: "나윤성",
    date: "2023.05.31",
    views: 354,
  },
  {
    title: "2번 공약에 관해 질문 드립니다.",
    author: "이서진",
    date: "2023.06.04",
    views: 873,
  },
  // 더미 데이터
];





function QnaMain() {

  return (
    <div>
      <div id="wrap">
        <div id="q_wrap">
          {/* <div id="q_writebtn">
            <button type="button" class="button">작성하기</button>
          </div> */}
          <div id="q_nav">
            <ul>
              {candidates.map((candidate) => (
                <CandidateListItem key={candidate.id} {...candidate} />
              ))}
            </ul>
          </div>
          <p></p>
          {qTableData.map((data, index) => (
            <QTableItem key={index} {...data} />
          ))}
        </div>
        <div id="side">
          <div id="side_banner1">
            <a href="#">
              <h1>지금 어떤 후보자를 찾을지<br />
                고민이시라구요?</h1>
              <p>지금 '나후찾'을 이용해보세요!</p>
              <img src="https://grepp-programmers.s3.amazonaws.com/production/file_resource/3140/Community-Banner_cote.png" />
            </a>
          </div>
          {/* <div id="side_banner2">
            <a href="#">
              <h1>투표는 만들어야겠고<br />
                어디서 만들지<br /> 고민이시라구요?</h1>
              <p>지금 'BlockVote'를 이용해보세요!</p>
              <img src="../blockchain.png" />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}


export default QnaMain;