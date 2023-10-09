import { useState } from 'react';

const PromisesController = ({ categories }) => {
  const [isPromiseButtonClicked, setIsPromiseButtonClicked] = useState(false);
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  const handlePromiseButtonClick = () => {
    setIsCategoriesVisible(!isCategoriesVisible);
    setIsPromiseButtonClicked(!isPromiseButtonClicked);
  };

  return(
    <div className='voting_right'>
      <div className='voting_right_top'>
        <div className='voting_right_title'>
          <span className='promise_title'>공약 카테고리</span>
          <button className={`promise_button ${isPromiseButtonClicked ? 'clicked' : ''}`} onClick={handlePromiseButtonClick}>공약</button>
        </div>
        <div className={`categories_group ${isCategoriesVisible ? 'visible' : 'hidden'}`}>
          {categories.map((category, index) => (
            <button key={index} className='voting_categories'> { category } </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PromisesController;
