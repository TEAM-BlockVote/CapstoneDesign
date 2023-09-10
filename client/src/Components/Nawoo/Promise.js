import React, { useState, useEffect } from 'react';
import "./NawooSelect.css";

function Promise ({selectCategories, setCurrentPage, setPromises}) {
  const [index, setIndex] = useState(0);
  const [currnetButtonValue, setCurrentButtonValue] = useState("다음 공약 보기");
  const [selectedPromises, setSelectedPromises] = useState([]);
  const categories = selectCategories.filter((value) => value !== false);
  const [selectedButtons, setSelectedButtons] = useState([]);
  
  useEffect(() => {
    setSelectedButtons(categories[index].promises.map(() => false));
  }, [index]);

  const handlePromiseSelect = (data, index) => {
    const newPromise = [...selectedPromises];
    const newButtons = [...selectedButtons];

    if(!newPromise.some(seleteCategory => seleteCategory.promise === data.promise)) {
      setSelectedPromises([...newPromise, data]);
      newButtons[index] = true;
      setSelectedButtons(newButtons);
    } else {
      const objIndex = newPromise.findIndex(item => item.promise === data.promise);
      newPromise.splice(objIndex, 1);
      setSelectedPromises(newPromise);
      newButtons[index] = false;
      setSelectedButtons(newButtons);
    }
  };

   const handleButtonClick = () => {
    if (!(index >= categories.length - 1)) {
      setCurrentButtonValue(`다음 공약 보기`);
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleShowResultsView = () => {
    setCurrentPage("result");
    setPromises(selectedPromises);
  }
  
  return (
    <div className='nawoo_form'>
      <div className='category_top'>
        <div className="qna_category">
          <span className="select_label1">{categories[index].key}</span>
          <div className="qna_select">
            {
              categories[index].promises.map((data, index) => (
                <button
                  key={index}
                  className={selectedButtons[index] ? `select_label2_selected` : 'select_label2'}
                  onClick={() => { handlePromiseSelect(data, index) }}
                >
                  {data.promise}
                </button>
              ))
            }
          </div>
          {`${index+1} / ${categories.length}`}
          {index === categories.length-1 ? <button onClick={ handleShowResultsView }> 결과보기 </button> : <button onClick={handleButtonClick}> {currnetButtonValue} </button>}
        </div>
      </div>
    </div>
  )
}

export default Promise;