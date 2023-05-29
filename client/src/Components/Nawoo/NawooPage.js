import React, { useState, useEffect } from 'react';
import NawooMain from './NawooMain';
import NawooCategory from './NawooCategory';
import NawooQna from './NawooQna';

function NawooPage() {
  const [currentPage, setCurrentPage] = useState('main');

  useEffect(() => {
    if (currentPage === 'category') {
    } else if (currentPage === 'qna') {
    }
  }, [currentPage]);

  const handleFormClick = () => {
    setCurrentPage('category');
  };

  const handleButtonClick = () => {
    setCurrentPage('qna');
  };

  return (
    <div className='nawoo_site'>
      <div className='nawoo_main'>
        {currentPage === 'main' && <NawooMain onFormClick={handleFormClick} />}
        {currentPage === 'category' && <NawooCategory onButtonClick={handleButtonClick} />}
        {currentPage === 'qna' && <NawooQna />}
      </div>
    </div>
  );
}

export default NawooPage;