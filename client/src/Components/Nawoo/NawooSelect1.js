import React from "react";
import "./NawooSelect.css";

function NawooSelect1({ selectedOption, handleSelectOption }) {
  return (
    <div className="qna_category">
      <label className="select_label1">시설 질의문</label>
      <div className="qna_imgmargin">
        <img src='/img/facility.png' className='qna_img' alt='nawooimg' />
      </div>
      <div className="qna_select">
        <label
          className={`select_label2 ${selectedOption === "option1" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option1")}
        >
          건물 인테리어를 개선
        </label>
        <label
          className={`select_label2 ${selectedOption === "option2" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option2")}
        >
          충전기 설치
        </label>
        <label
          className={`select_label2 ${selectedOption === "option3" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option3")}
        >
          목욕탕 시설 추가
        </label>
      </div>
    </div>
  );
}

export default NawooSelect1;