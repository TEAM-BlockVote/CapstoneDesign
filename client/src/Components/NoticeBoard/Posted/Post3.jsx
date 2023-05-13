import React from "react";
import "./Post3.css"; // 새로운 CSS 파일을 import합니다.

import PromiseTabs from "../PromiseAll/PromiseTabs.jsx";
import WriteButton from "../WriteAll/WriteButton.jsx";
import Pagination from "../TableAll/Pagination.jsx";

function Post3() {
  return (
    <div className="post3-container"> {/* 클래스 이름을 추가합니다. */}
      <h1>게시글 제목</h1>
      <div className="post3-info"> {/* 클래스 이름을 추가합니다. */}
        <p>작성자: 이서진</p>
        <p>작성일: 2023.5.5 / 조회수: 3</p>
      </div>
      <hr />
      <p>
        백년전쟁(1337-1453)은 영국과 프랑스의 100년간의 전쟁이었다. 이전의 영국 왕들이 프랑스 왕좌에 대한 공격을 계속 시도하면서 시작되었다. 이후 프랑스의 장수 조안다르크와 영국의 헨리 5세의 싸움에서 영국이 승리를 거둬 장수조안다르크가 포로로 잡혀 가라앉았다
      </p>
    </div>
  );
}

export default Post3;