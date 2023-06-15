import React from "react";
import "./NawooSelect.css";

function NawooSelect6({ selectedOption, handleSelectOption }) {
  return (
    <div className="qna_category">
      <label className="select_label1">진로</label>
      <div className="qna_imgmargin">
        <img src='/img/course.png' className='qna_img' alt='nawooimg' />
      </div>
      <div className="qna_select">
        <label
          className={`select_label2 ${selectedOption === "option1" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option1")}
        >
          취업 프로그램 강화
        </label>
        <label
          className={`select_label2 ${selectedOption === "option2" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option2")}
        >
          취업반 전문 강의 개설
        </label>
        <label
          className={`select_label2 ${selectedOption === "option3" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option3")}
        >
          현장실습 개선
        </label>
      </div>
    </div>
  );
}

export default NawooSelect6;