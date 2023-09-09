function Category({categories, selectedButtons, setCurrentPage, onCategorySelect}) {
  const handleCategorySelect = (category, index) => {
    onCategorySelect(category, index);
  }
  return (
    <div className='nawoo_form'>
      <div className='category_top'>
        <label className='category_label1'>관심있는 분야를 선택해주세요.</label>
        <div className='count_margin'>
          <label className='category_label2'>항목 : </label>
          <div className='category_count'>
            {0}
          </div>
        </div>
      </div>
      <div className='category_middle'>
        {
          Object.keys(categories).map((category, index) => (
            <button
              key={index}
              className={ selectedButtons[index] ? `category_btn_selected` : 'category_btn'}
              onClick={() => {handleCategorySelect(category, index)}}
            >
              {category}
            </button>
          ))
        }
      </div>
      <div className='category_bottom'>
        <button className='category_next' onClick={ () => {setCurrentPage("PromiseSelect")}}>
          테스트 하기
        </button>
      </div>
    </div>
  )
}

export default Category;