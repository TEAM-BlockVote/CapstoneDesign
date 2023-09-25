import React from "react";
import "./QnaMainInfo.css";


 // 투표 버튼 컴포넌트  title 투표제목 link 해당 qna페이지
 // vote_content ㄴ
function VoteBtn({ title, link }) {

  return (
    <div id="btn">
      <a href={link} id="select_vote">
        <div id="vote_title">
          {title}
        </div>
        <div id="vote_content">
          해당 투표에 질문을 하고싶은 후보자가 있으면 선택하세요!
        </div>
      </a>
    </div>
  );
}

const btnData = [
  {
    title: "전준호바보전준호바전준호바보",
    href: "#"
  },
  // 더미 데이터
];


function QnaMainInfo() {


  return (
    <>
     <div className="custom-wrap">
        <div className="custom-content">
          <div className="custom-left">
            <h1 className="custom-title">
              <span className="custom-qna">Q&A</span> 페이지
            </h1>
            <span className="custom-h2">당신이 질문할 후보자가 있는 투표를 선택하세요!</span>
            <p>
              저희 'Blockvote'는 유권자들에게 Q&A페이지를 제공합니다.<br />
              많은 투표 플랫폼들은 Q&A페이지를 제공하지 않습니다<br />
              투표 플랫폼에서 Q&A페이지가 주는 여러가지 부정적인 작용<br />
              익명 사용자의 무분별한 도배, 광고성 게시글 등의 문제를 <br />
              'Blockvote'에서는 인증된 사용자만이<br />
              이 페이지를 이용할 수 있게 운영됩니다.
            </p>
          </div>
          <div className="custom-right">
            {btnData.map((data, index) => (
              <VoteBtn key={index} {...data} />
            ))}
          </div>
        </div>
      </div>

    </>
  );

  // return (
  //   <>
  //     <div id="wrap">
  //       <div id="content">
  //         <div id="left">
  //           <h1 id="title"><span id="qna">Q&A</span> 페이지</h1>
  //           <span id="h2">당신이 질문할 후보자가 있는 투표를 선택하세요!</span>
  //           <p>저희 'Blockvote'는 유권자들에게 Q&A페이지를 제공합니다.<br />
  //             실제로 많은 투표 플랫폼들은 Q&A페이지를 제공하지 않습니다<br />
  //             투표 플랫폼에서 Q&A페이지가 주는 여러가지 부정적인 작용<br />
  //             익명 사용자의 무분별한 도배, 광고성 게시글 등의 문제를 <br />
  //             'Blockvote'에서는 인증된 사용자만이 이 페이지를 이용할 수 있게<br />
  //             운영됩니다.
  //           </p>
  //         </div>
  //         <div id="right">
  //           <div id="btn">
  //             <a href="#" id="select_vote">
  //               <div id="vote_title">
  //                 제 23회 서일대학교 학생회 투표
  //               </div>
  //               <div id="vote_content">곧 취준생되는 입장에서 정말 유익하게 들었습니다.
  //                 jvm 설명처럼 면접에서 나올만한 java 관련 기술에 관한 설명들(oop, 문법등)도 있다면 나중에 나왔으면 좋겠습니다</div>
  //             </a>
  //           </div>
  //           <div id="btn">
  //             <a href="#" id="select_vote">
  //               <div id="vote_title">
  //                 제 23회 서일대학교 학생회 투표
  //               </div>
  //               <div id="vote_content">곧 취준생되는 입장에서 정말 유익하게 들었습니다.
  //                 jvm 설명처럼 면접에서 나올만한 java 관련 기술에 관한 설명들(oop, 문법등)도 있다면 나중에 나왔으면 좋겠습니다</div>
  //             </a>
  //           </div>
  //           <div id="btn">
  //             <a href="#" id="select_vote">
  //               <div id="vote_title">
  //                 제 23회 서일대학교 학생회 투표
  //               </div>
  //               <div id="vote_content">곧 취준생되는 입장에서 정말 유익하게 들었습니다.
  //                 jvm 설명처럼 면접에서 나올만한 java 관련 기술에 관한 설명들(oop, 문법등)도 있다면 나중에 나왔으면 좋겠습니다</div>
  //             </a>
  //           </div>
  //           <div id="btn">
  //             <a href="#" id="select_vote">
  //               <div id="vote_title">
  //                 제 23회 서일대학교 학생회 투표
  //               </div>
  //               <div id="vote_content">곧 취준생되는 입장에서 정말 유익하게 들었습니다.
  //                 jvm 설명처럼 면접에서 나올만한 java 관련 기술에 관한 설명들(oop, 문법등)도 있다면 나중에 나왔으면 좋겠습니다</div>
  //             </a>
  //           </div>
  //           <div id="btn">
  //             <a href="#" id="select_vote">
  //               <div id="vote_title">
  //                 제 23회 서일대학교 학생회 투표
  //               </div>
  //               <div id="vote_content">곧 취준생되는 입장에서 정말 유익하게 들었습니다.
  //                 jvm 설명처럼 면접에서 나올만한 java 관련 기술에 관한 설명들(oop, 문법등)도 있다면 나중에 나왔으면 좋겠습니다</div>
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

}

export default QnaMainInfo;