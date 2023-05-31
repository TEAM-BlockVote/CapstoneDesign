import React, { useState } from 'react';
import "./NawooCategory.css";

function NawooCategory({ onButtonClick }) {
  const [count, setCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleButtonClick = (category) => {
    if (selectedCategory === category) {
      setCount(count - 10);
      setSelectedCategory('');
    } else {
      setCount(count + 10);
      setSelectedCategory(category);
    }
  };

  return (
    <div className='nawoo_form'>
      <div className='category_top'>
        <label className='category_label1'>누가 당신과 적합한 후보입니까?</label>
        <label className='category_label2'>선택하시오.</label>
        <div className='category_count'>
          {count}
        </div>
      </div>
      <div className='category_middle'>
        <button
          className={`category_btn ${selectedCategory === '시설' ? 'selected' : ''}`}
          onClick={() => handleButtonClick('시설')}
        >
          시설
        </button>
        <button
          className={`category_btn ${selectedCategory === '복지' ? 'selected' : ''}`}
          onClick={() => handleButtonClick('복지')}
        >
          복지
        </button>
        <button
          className={`category_btn ${selectedCategory === '교육' ? 'selected' : ''}`}
          onClick={() => handleButtonClick('교육')}
        >
          교육
        </button>
        <button
          className={`category_btn ${selectedCategory === '소통' ? 'selected' : ''}`}
          onClick={() => handleButtonClick('소통')}
        >
          소통
        </button>
        <button
          className={`category_btn ${selectedCategory === '행사' ? 'selected' : ''}`}
          onClick={() => handleButtonClick('행사')}
        >
          행사
        </button>
        <button
          className={`category_btn ${selectedCategory === '진로' ? 'selected' : ''}`}
          onClick={() => handleButtonClick('진로')}
        >
          진로
        </button>
      </div>
      <div className='category_bottom'>
        <button className='category_next' onClick={onButtonClick}>테스트 하기</button>
      </div>
    </div>
  );
}

export default NawooCategory;