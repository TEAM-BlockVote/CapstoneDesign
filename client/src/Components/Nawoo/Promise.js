import React, { useState, useEffect } from 'react';
import './Promise.css';

function Promise ({selectCategories, setCurrentPage, setPromises}) {
  const [index, setIndex] = useState(0);
  const [currnetButtonValue, setCurrentButtonValue] = useState("다음 공약 보기");
  const [selectedPromises, setSelectedPromises] = useState([]);
  const categories = selectCategories.filter((value) => value !== false);
  const [selectedButtons, setSelectedButtons] = useState([]);

  const [maxChoices, setMaxChoices] = useState(0);
  
  useEffect(() => {
    setSelectedButtons(categories[index].promises.map(() => false));
    setMaxChoices(Math.floor((categories[index]['promises'].length - 1) / 3) + 1);
  }, [index]);

  const handlePromiseSelect = (data, index) => {
    const newPromise = [...selectedPromises];
    const newButtons = [...selectedButtons];
  
    if(!newPromise.some(seleteCategory => seleteCategory.promise === data.promise)) {
      if(maxChoices > 0) {
        setSelectedPromises([...newPromise, data]);
        newButtons[index] = true;
        setSelectedButtons(newButtons);
        setMaxChoices((prevData) => 
          prevData-1
        )
      }
    } else {
      const objIndex = newPromise.findIndex(item => item.promise === data.promise);
      newPromise.splice(objIndex, 1);
      setSelectedPromises(newPromise);
      newButtons[index] = false;
      setSelectedButtons(newButtons);
      setMaxChoices((prevData) => 
        prevData+1
      )
    }
  };

   const handleButtonClick = () => {
    if (!(index >= categories.length - 1)) {
      setCurrentButtonValue(`다음 공약 보기`);
      setIndex((prevIndex) => prevIndex + 1);
    }
    setMaxChoices(Math.floor((categories[index]['promises'].length - 1) / 3) + 1);
  };

  const handleShowResultsView = () => {
    setCurrentPage("result");
    setPromises(selectedPromises);
  }

  return (
    <div className='nw_form'>
      <div className='category_top'>
        <div className="qna_category">
          <span className="select_label1">{categories[index].key}</span>
          <p style={{color: 'white'}} > {`${index+1} / ${categories.length}`} </p>
          <div className="qna_select">
            {
              categories[index].promises.map((data, index) => (
                <button
                  key={index}
                  className={selectedButtons[index] ? `category_btn_selected` : 'category_btn'}
                  onClick={() => { handlePromiseSelect(data, index) }}
                >
                  {data.promise}
                </button>
              )) 
            }
          </div>
          <div style={{color: 'white'}}> 
          <span>
            선택가능: { maxChoices }
          </span>
          </div>
          {
            index === categories.length-1 ? 
            <button className='result_button' onClick={ handleShowResultsView }> 결과보기 </button> :
            <button className='next_button' onClick={handleButtonClick}> {currnetButtonValue} </button>
          }
        </div>
      </div>
    </div>
  )
}

export default Promise;