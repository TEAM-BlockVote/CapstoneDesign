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
    title: "전준호바보전준호바전준호바보",
    author: "홍길동",
    date: "2023.05.17",
    views: 23,
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

  // return (
  //   <div>
  //     <div id="wrap">
  //   <div id="q_wrap">
  //     {/* <div id="q_writebtn">
  //       <button type="button" class="button">작성하기</button>
  //     </div> */}
  //     <p></p>
  //     <div id="q_nav">
  //       <ul>
  //         <li><a href="#" id="candidate_qna">후보1</a></li>
  //         <li><a href="#" id="candidate_qna">후보2</a></li>
  //         <li><a href="#" id="candidate_qna">후보3</a></li>
  //       </ul>
  //     </div>
  //     <div id="q_table">
  //       <div id="q_question">
  //         <div id="q_title"><a href="#">도서관 시설 개선에 대해 질문드립니다</a></div>
  //         <div id="q_name_date">홍길동 * 2023.05.17</div>
  //       </div>
  //       <div id="q_view">
  //         <div id="q_viewnum">23</div>
  //         <div id="q_views">조회</div>
  //       </div>
  //     </div>
  //     <div id="q_table">
  //       <div id="q_question">
  //         <div id="q_title"><a href="#">부학회장 후보님께 질문드립니다</a></div>
  //         <div id="q_name_date">김철수 * 2023.05.16</div>
  //       </div>
  //       <div id="q_view">
  //         <div id="q_viewnum">20</div>
  //         <div id="q_views">조회</div>
  //       </div>
  //     </div>
  //     <div id="q_table">
  //       <div id="q_question">
  //         <div id="q_title"><a href="#">운동장 잔디밭 개선에 대해 질문드립니다</a></div>
  //         <div id="q_name_date">김영희 * 2023.05.17</div>
  //       </div>
  //       <div id="q_view">
  //         <div id="q_viewnum">15</div>
  //         <div id="q_views">조회</div>
  //       </div>
  //     </div>
  //     <div id="q_table">
  //       <div id="q_question">
  //         <div id="q_title"><a href="#">우리 학교 축제 공약에 대한 질문드립니다</a></div>
  //         <div id="q_name_date">이진수 * 2023.05.15</div>
  //       </div>
  //       <div id="q_view">
  //         <div id="q_viewnum">23</div>
  //         <div id="q_views">조회</div>
  //       </div>
  //     </div>
  //     <div id="q_table">
  //       <div id="q_question">
  //         <div id="q_title"><a href="#">학교 체육관 설치 공약에 대해 질문드립니다</a></div>
  //         <div id="q_name_date">김선희 * 2023.05.14</div>
  //       </div>
  //       <div id="q_view">
  //         <div id="q_viewnum">13</div>
  //         <div id="q_views">조회</div>
  //       </div>
  //     </div>
  //     <div id="q_table">
  //       <div id="q_question">
  //         <div id="q_title"><a href="#">1번 공약에 대해 질문드립니다</a></div>
  //         <div id="q_name_date">김용수 * 2023.05.12</div>
  //       </div>
  //       <div id="q_view">
  //         <div id="q_viewnum">32</div>
  //         <div id="q_views">조회</div>
  //       </div>
  //     </div>
  //   </div>
  //   <div id="side">
  //     <div id="side_banner1">
  //       <a href="#">
  //         <h1>지금 어떤 후보자를 찾을지<br/>
  //          고민이시라구요?</h1>
  //          <p>지금 '나후찾'을 이용해보세요!</p>
  //          <img src="https://grepp-programmers.s3.amazonaws.com/production/file_resource/3140/Community-Banner_cote.png" />
  //       </a>
  //     </div>
  //     {/* <div id="side_banner2">
  //       <a href="#">
  //         <h1>투표는 만들어야겠고<br/>
  //          어디서 만들지<br/> 고민이시라구요?</h1>
  //          <p>지금 'BlockVote'를 이용해보세요!</p>
  //          <img src={blockImage} />
  //       </a>
  //     </div> */}
  //   </div>
  // </div>
  //   </div>
  // );
}


export default QnaMain;