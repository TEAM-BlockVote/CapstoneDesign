import React from 'react';
import NawooSelect1 from './NawooSelect1';
import NawooSelect2 from './NawooSelect2';
import NawooSelect3 from './NawooSelect3';
import NawooSelect4 from './NawooSelect4';
import NawooSelect5 from './NawooSelect5';
import NawooSelect6 from './NawooSelect6';
import NawooSelect7 from './NawooSelect7';
import NawooSelect8 from './NawooSelect8';
import NawooSelect9 from './NawooSelect9';

function NawooQna({ selectedCategories }) {
  return (
    <div className='nawoo_form'>
      {selectedCategories.includes('시설') && <NawooSelect1 />}
      {selectedCategories.includes('복지') && <NawooSelect2 />}
      {selectedCategories.includes('교육') && <NawooSelect3 />}
      {selectedCategories.includes('소통') && <NawooSelect4 />}
      {selectedCategories.includes('행사') && <NawooSelect5 />}
      {selectedCategories.includes('진로') && <NawooSelect6 />}
      {selectedCategories.includes('생활') && <NawooSelect7 />}
      {selectedCategories.includes('의료') && <NawooSelect8 />}
      {selectedCategories.includes('상담') && <NawooSelect9 />}
    </div>
  );
}

export default NawooQna;