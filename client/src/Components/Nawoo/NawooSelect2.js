import React from "react";
import "./NawooSelect.css";

function NawooSelect2({ selectedOption, handleSelectOption }) {
  return (
    <div className="qna_category">
      <div className="qna_category">
        <label className="select_label1">복지</label>
        <div className="qna_imgmargin">
          <img src='/img/welfare.png' className='qna_img' alt='nawooimg' />
        </div>
        <div className="qna_select">
          <label
            className={`select_label2 ${selectedOption === "option1" ? "selected" : ""}`}
            onClick={() => handleSelectOption("option1")}
          >
            학교 식단 개선
          </label>
          <label
            className={`select_label2 ${selectedOption === "option2" ? "selected" : ""}`}
            onClick={() => handleSelectOption("option2")}
          >
            신체 활동 프로그램 강화
          </label>
          <label
            className={`select_label2 ${selectedOption === "option3" ? "selected" : ""}`}
            onClick={() => handleSelectOption("option3")}
          >
            방학 여행 프로그램
          </label>
        </div>
      </div>
    </div>
  )
}
export default NawooSelect2;
