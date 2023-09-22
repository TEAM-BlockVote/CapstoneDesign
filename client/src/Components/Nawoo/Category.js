import React from 'react';
import Loding from '../Main/Loding';
import "./Category.css";

const Category = ({categories, selectCategories, setCurrentPage, onCategorySelect}) => {
  const handleCategorySelect = (category, index) => {
    onCategorySelect(category, index);
  }
  return (
    <div className='nw_form'>
      <div className='nw_top'>
        <div className='nw_category_name'>
          <p> 총학생회 선거 </p>
        </div>
        <div className='count_div'>
          {/* 총 문항 수 : 30개 */}
        </div>
        <div className='categories_explain'>
          <p>유권자가 선택한 투표에 GPT기술을 접목하여 비슷한 공약끼리 카테고리를 생성했습니다.</p>
          <p>여러 카테고리를 선택 할 수 있으며 한 가지 이상 선택해야 합니다.</p>
        </div>
      </div>
      <div className='nw_middle'>
        <div className='category_middle'>
          {
            !categories ? <Loding/> : Object.keys(categories).map((category, index) => (
              <button
                key={index}
                className={ selectCategories[index] ? `category_btn_selected` : 'category_btn'}
                onClick={() => {handleCategorySelect(category, index)}}
              >
                {category}
              </button>
            ))
          }
        </div>
      </div>
      <div className='category_bottom'>
        <button className='category_next'
          onClick={ () => { 
            if(selectCategories.some(item => item !== false)) {
              setCurrentPage("promiseSelect");
            } else {
              alert("카테고리를 선택해주세요");
            }}}>
          테스트 하기
        </button>
      </div>
    </div>
  );
}
export default Category;