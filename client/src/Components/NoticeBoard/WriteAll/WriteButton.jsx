import React from "react";
import { Link } from "react-router-dom";
import "./WriteButton.css";

function WriteButton() {
  return (
    <div >
      <Link to="/WritingForm" className="btn btn-default btn-write" >글 작성하기</Link>
    </div>
  );
}

export default WriteButton;
