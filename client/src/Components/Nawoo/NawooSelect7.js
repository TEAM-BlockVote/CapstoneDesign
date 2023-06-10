import React from "react";
import "./NawooSelect.css";

function NawooSelect7({ selectedOption, handleSelectOption }) {
  return (
    <div className="qna_category">
      <label className="select_label1">생활 질의문</label>
      <div className="qna_imgmargin">
        <img src='/img/life.png' className='qna_img' alt='nawooimg' />
      </div>
      <div className="qna_select">
        <label
          className={`select_label2 ${selectedOption === "option1" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option1")}
        >
          예술 전시회 개최
        </label>
        <label
          className={`select_label2 ${selectedOption === "option2" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option2")}
        >
          스터디 그룹 지원
        </label>
        <label
          className={`select_label2 ${selectedOption === "option3" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option3")}
        >
          다양한 동아리 활성화
        </label>
      </div>
    </div>
  );
}

export default NawooSelect7;