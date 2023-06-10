import React, { useState, useEffect } from 'react';
import NawooSelect1 from './NawooSelect1';
import NawooSelect2 from './NawooSelect2';
import NawooSelect3 from './NawooSelect3';
import NawooSelect4 from './NawooSelect4';
import NawooSelect5 from './NawooSelect5';
import NawooSelect6 from './NawooSelect6';
import NawooSelect7 from './NawooSelect7';
import NawooSelect8 from './NawooSelect8';
import NawooSelect9 from './NawooSelect9';
import NawooResult from './NawooResult';
import "./NawooQna.css";

const componentsMap = {
  시설: NawooSelect1,
  복지: NawooSelect2,
  교육: NawooSelect3,
  소통: NawooSelect4,
  행사: NawooSelect5,
  진로: NawooSelect6,
  생활: NawooSelect7,
  의료: NawooSelect8,
  상담: NawooSelect9
};

function NawooQna({ selectedCategories, onNextButtonClick }) {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    setCurrentCategoryIndex(0);
    setSelectedOptions({});
  }, [selectedCategories]);

  const handleNextClick = () => {
    if (currentCategoryIndex === selectedCategories.length - 1) {
      onNextButtonClick();
    } else {
      setCurrentCategoryIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [selectedCategories[currentCategoryIndex]]: option
    }));
  };

  const CurrentComponent = componentsMap[selectedCategories[currentCategoryIndex]];
  const isLastCategory = currentCategoryIndex === selectedCategories.length - 1;
  const isNextButtonDisabled = !selectedOptions[selectedCategories[currentCategoryIndex]];

  return (
    <div className='nawoo_form'>
      <div className='qna_top'>
        <label className='qna_label1'>가장 실현되면 좋을 것 같은 질의문을 선택하세요.</label>
      </div>
      <div className='qna_middle'>
        <CurrentComponent selectedOption={selectedOptions[selectedCategories[currentCategoryIndex]]} handleSelectOption={handleSelectOption} />
      </div>
      {isLastCategory ? (
        <div className='qna_bottom'>
          <button className='qna_next' onClick={handleNextClick} disabled={isNextButtonDisabled}>
            결과보기
          </button>
        </div>
      ) : (
        <div className='qna_bottom'>
          <button className='qna_next' onClick={handleNextClick} disabled={isNextButtonDisabled}>
            다음
          </button>
        </div>
      )}
      {currentCategoryIndex === selectedCategories.length && (
        <NawooResult selectedOptions={selectedOptions} />
      )}
    </div>
  );
}

export default NawooQna;