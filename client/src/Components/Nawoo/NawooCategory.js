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

  return (
    <div className='nawoo_form'>
      <div className='category_top'>
        <label className='category_label1'>누가 당신과 적합한 후보입니까?</label>
        <label className='category_label2'>선택하시오.</label>
        <div className='count_margin'>
          <label className='category_label3'>문항 : </label>
          <div className='category_count'>
            {count}
          </div>
        </div>
      </div>
      <div className='category_middle'>
        <button
          className={`category_btn ${selectedCategories.includes('시설') ? 'selected' : ''}`}
          onClick={() => handleButtonClick('시설')}
        >
          시설
        </button>
        <button
          className={`category_btn ${selectedCategories.includes('복지') ? 'selected' : ''}`}
          onClick={() => handleButtonClick('복지')}
        >
          복지
        </button>
        <button
          className={`category_btn ${selectedCategories.includes('교육') ? 'selected' : ''}`}
          onClick={() => handleButtonClick('교육')}
        >
          교육
        </button>
        <button
          className={`category_btn ${selectedCategories.includes('소통') ? 'selected' : ''}`}
          onClick={() => handleButtonClick('소통')}
        >
          소통
        </button>
        <button
          className={`category_btn ${selectedCategories.includes('행사') ? 'selected' : ''}`}
          onClick={() => handleButtonClick('행사')}
        >
          행사
        </button>
        <button
          className={`category_btn ${selectedCategories.includes('진로') ? 'selected' : ''}`}
          onClick={() => handleButtonClick('진로')}
        >
          진로
        </button>
        <button
          className={`category_btn ${selectedCategories.includes('생활') ? 'selected' : ''}`}
          onClick={() => handleButtonClick('생활')}
        >
          생활
        </button>
        <button
          className={`category_btn ${selectedCategories.includes('의료') ? 'selected' : ''}`}
          onClick={() => handleButtonClick('의료')}
        >
          의료
        </button>
        <button
          className={`category_btn ${selectedCategories.includes('상담') ? 'selected' : ''}`}
          onClick={() => handleButtonClick('상담')}
        >
          상담
        </button>
      </div>
      <div className='category_bottom'>
        <button className='category_next' onClick={onButtonClick}>테스트 하기</button>
      </div>
    </div>
  );
}

export default NawooCategory;