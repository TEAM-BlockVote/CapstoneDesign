import React from "react";
import "./NawooSelect.css";

function NawooSelect4({ selectedOption, handleSelectOption }) {
  return (
    <div className="qna_category">
      <label className="select_label1">소통 질의문</label>
      <div className="qna_select">
        <label
          className={`select_label2 ${selectedOption === "option1" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option1")}
        >
          교수와 학생의 소통 커뮤니티
        </label>
        <label
          className={`select_label2 ${selectedOption === "option2" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option2")}
        >
          교우 관계 커뮤니티 강화
        </label>
        <label
          className={`select_label2 ${selectedOption === "option3" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option3")}
        >
          다른 학교와의 소통 강화
        </label>
      </div>
    </div>
  );
}

export default NawooSelect4;