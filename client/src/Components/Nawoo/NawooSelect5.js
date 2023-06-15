import React from "react";
import "./NawooSelect.css";

function NawooSelect5({ selectedOption, handleSelectOption }) {
  return (
    <div className="qna_category">
      <label className="select_label1">행사</label>
      <div className="qna_imgmargin">
        <img src='/img/event.png' className='qna_img' alt='nawooimg' />
      </div>
      <div className="qna_select">
        <label
          className={`select_label2 ${selectedOption === "option1" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option1")}
        >
          행사 참여시 혜택
        </label>
        <label
          className={`select_label2 ${selectedOption === "option2" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option2")}
        >
          초청 공연 행사
        </label>
        <label
          className={`select_label2 ${selectedOption === "option3" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option3")}
        >
          행사에 오락요소 추가
        </label>
      </div>
    </div>
  );
}

export default NawooSelect5;