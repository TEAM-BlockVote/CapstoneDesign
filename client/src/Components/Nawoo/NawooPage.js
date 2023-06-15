import React, { useState, useEffect } from 'react';
import NawooMain from './NawooMain';
import NawooCategory from './NawooCategory';
import NawooQna from './NawooQna';
import NawooResult from './NawooResult';
import "./NawooPage.css";

function NawooPage() {
  const [currentPage, setCurrentPage] = useState('main');
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (currentPage === 'category') {
    } else if (currentPage === 'qna') {
    }
  }, [currentPage]);

  const handleFormClick = () => {
    setCurrentPage('category');
  };

  const handleButtonClick = (categories) => {
    setSelectedCategories(categories);
    setCurrentPage('qna');
  };

  const handleNextButtonClick = () => {
    setCurrentPage('result');
  };

  return (
    <div className='nawoo_site'>
      <div className='nawoo_main'>
        {currentPage === 'main' && <NawooMain onFormClick={handleFormClick} />}
        {currentPage === 'category' && <NawooCategory onButtonClick={handleButtonClick} />}
        {currentPage === 'qna' && (
          <NawooQna selectedCategories={selectedCategories} onNextButtonClick={handleNextButtonClick} />
        )}
        {currentPage === 'result' && <NawooResult />}
      </div>
    </div>
  );
}

export default NawooPage;