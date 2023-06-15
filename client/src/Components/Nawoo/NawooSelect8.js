import React from "react";
import "./NawooSelect.css";

function NawooSelect8({ selectedOption, handleSelectOption }) {
  return (
    <div className="qna_category">
      <label className="select_label1">의료</label>
      <div className="qna_imgmargin">
        <img src='/img/medical.png' className='qna_img' alt='nawooimg' />
      </div>
      <div className="qna_select">
        <label
          className={`select_label2 ${selectedOption === "option1" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option1")}
        >
          치과 진료 지원
        </label>
        <label
          className={`select_label2 ${selectedOption === "option2" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option2")}
        >
          건강검진 지원
        </label>
        <label
          className={`select_label2 ${selectedOption === "option3" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option3")}
        >
          다이어트 프로그램
        </label>
      </div>
    </div>
  );
}

export default NawooSelect8;