import React, { useState } from 'react';
import "./NawooCategory.css";

function NawooCategory({ onButtonClick }) {
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setCount(count + 1);
  };

  const handleCategoryButtonClick = (event) => {
    const { name } = event.target;
    if (name === 'category') {
      handleButtonClick();
    }
  };

  const categories = ['시설', '복지', '교육', '소통', '행사', '진로'];

  return (
    <div className='nawoo_form'>
      <div className='category_top'>
        <label className='category_label1'>누가 당신과 적합한 후보입니까?</label>
        <label className='category_label2'>선택하시오.</label>
      </div>
      <div className='category_middle'>
        {categories.map((category, index) => (
          <button key={index} name='category' className='category_btn' onClick={handleCategoryButtonClick}>
            {category}
          </button>
        ))}
      </div>
      <div className='category_bottom'>
        <button className='category_next' onClick={onButtonClick}>테스트 하기</button>
      </div>
      <div className='count_box'>
        {count}
      </div>
    </div>
  );
}

export default NawooCategory;