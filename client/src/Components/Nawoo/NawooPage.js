import React, { useContext, useState, useEffect } from 'react';
import NawooMain from './NawooMain';
import "./NawooPage.css";

function NawooPage() {
  return (
    <div className='nawoo_site'>
      <div className='nawoo_main'>
        <NawooMain/>
      </div>
    </div>
  );
};

export default NawooPage;