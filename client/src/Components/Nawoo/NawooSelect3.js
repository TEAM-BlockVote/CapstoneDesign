import React from "react";
import "./NawooSelect.css";

function NawooSelect3({ selectedOption, handleSelectOption }) {
  return (
    <div className="qna_category">
      <label className="select_label1">교육</label>
      <div className="qna_imgmargin">
        <img src='/img/education.png' className='qna_img' alt='nawooimg' />
      </div>
      <div className="qna_select">
        <label
          className={`select_label2 ${selectedOption === "option1" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option1")}
        >
          실습 강의 개선
        </label>
        <label
          className={`select_label2 ${selectedOption === "option2" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option2")}
        >
          이론 강의 개선
        </label>
        <label
          className={`select_label2 ${selectedOption === "option3" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option3")}
        >
          자율적인 학습 강화
        </label>
      </div>
    </div>
  );
}

export default NawooSelect3;