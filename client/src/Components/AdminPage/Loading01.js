import React from "react";
import Spinner from "../Main/images/Spinner.gif"

const Loading01 = () => {
  return(
    <div>
      <h5>잠시만 기다려주세요...</h5>
      <img src={Spinner} alt="로딩" width="10%" />
    </div>
  );
};

export default Loading01;