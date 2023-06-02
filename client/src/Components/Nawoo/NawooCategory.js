import React, { useState } from 'react';
import "./NawooCategory.css";

function NawooCategory({ onButtonClick }) {
  const [count, setCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleButtonClick = (category) => {
    if (selectedCategories.includes(category)) {
      setCount(count - 10);
      setSelectedCategories(selectedCategories.filter((selectedCategory) => selectedCategory !== category));
    } else {
      setCount(count + 10);
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const isNextButtonDisabled = selectedCategories.length === 0;

  return (
    <div className='nawoo_form'>
      <div className='category_top'>
        <label className='category_label1'>어떤 것들이 바뀌길 바랍니까?</label>
        <label className='category_label2'>카테고리를 선택하시오.</label>
        <div className='count_margin'>
          <label className='category_label3'>문항 : </label>
          <div className='category_count'>
            {count}
          </div>
        </div>
      </div>
      <div className='category_middle'>
        {['시설', '복지', '교육', '소통', '행사', '진로', '생활', '의료', '상담'].map((category) => (
          <button
            key={category}
            className={`category_btn ${selectedCategories.includes(category) ? 'selected' : ''}`}
            onClick={() => handleButtonClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className='category_bottom'>
        <button className='category_next' onClick={onButtonClick} disabled={isNextButtonDisabled}>
          테스트 하기
        </button>
      </div>
    </div>
  );
}

export default NawooCategory;