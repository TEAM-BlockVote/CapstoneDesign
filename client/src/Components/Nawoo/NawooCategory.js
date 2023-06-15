import React, { useState } from 'react';
import "./NawooCategory.css";

function NawooCategory({ onButtonClick }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleButtonClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((selectedCategory) => selectedCategory !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const isNextButtonDisabled = selectedCategories.length === 0;

  const handleNextClick = () => {
    onButtonClick(selectedCategories);
  };

  return (
    <div className='nawoo_form'>
      <div className='category_top'>
        <label className='category_label1'>관심있는 분야를 선택해주세요.</label>
        <div className='count_margin'>
          <label className='category_label2'>항목 : </label>
          <div className='category_count'>
            {selectedCategories.length * 3}
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
        <button className='category_next' onClick={handleNextClick} disabled={isNextButtonDisabled}>
          테스트 하기
        </button>
      </div>
    </div>
  );
}

export default NawooCategory;