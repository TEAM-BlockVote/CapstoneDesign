import React from "react";
import { Link } from "react-router-dom";

function WriteButton() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
      <Link to="/WritingForm" className="btn btn-default btn-sm" style={{ border: "1px solid #ccc", width: "100px", marginRight: "300px"}}>글 작성하기</Link>
    </div>
  );
}

export default WriteButton;
