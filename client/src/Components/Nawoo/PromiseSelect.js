import React, { useState } from 'react';
import "./NawooSelect.css";

function PromiseSelect ({selectCategories}) {
  const [index, setIndex] = useState(0);
  const [currnetButtonValue, setCurrentButtonValue] = useState("다음 공약 보기");
  const categories = selectCategories.filter((value) => value !== false);
  console.log(categories[index].key);
  // const categories = Object.values(selectCategories);

  
  // categories.map((ele) => (
  //   console.log(ele)
  // ));

   const handleButtonClick = () => {
    if (index >= categories.length - 1) {
      // 배열의 마지막 요소에 도달했을 때
      setCurrentButtonValue('결과 보기');
    } else {
      // 다음 요소로 이동
      console.log(index, categories.length - 1);
      setIndex((prevIndex) => prevIndex + 1);
    }

    if(index === categories.length - 1) {

    }
  };
  return (
    <div className="qna_category">
    <label className="select_label1">{categories[index].key}</label>
    <div className="qna_select">
      {
        categories[index].promises.map((data, index) => (
          <label key={index}
            className={`select_label2`}
          >
            {data.promise}
          </label>
        ))
      }
    </div>
    <button onClick={handleButtonClick}> {currnetButtonValue} </button>
  </div>
  )
}

export default PromiseSelect;