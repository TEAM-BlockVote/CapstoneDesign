import React from "react";
import "./NawooSelect.css";

function NawooSelect8({ selectedOption, handleSelectOption }) {
  return (
    <div className="qna_category">
      <label className="select_label1">상담 질의문</label>
      <div className="qna_select">
        <label
          className={`select_label2 ${selectedOption === "option1" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option1")}
        >
          교수와 학생의 상담
        </label>
        <label
          className={`select_label2 ${selectedOption === "option2" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option2")}
        >
          선배와 후배의 상담
        </label>
        <label
          className={`select_label2 ${selectedOption === "option3" ? "selected" : ""}`}
          onClick={() => handleSelectOption("option3")}
        >
          해당 분야 전문가와의 상담
        </label>
      </div>
    </div>
  );
}

export default NawooSelect8;