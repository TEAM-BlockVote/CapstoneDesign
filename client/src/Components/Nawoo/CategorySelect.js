import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Category from './Category';
import Promise from './Promise';
import Result from './Result';
import "./NawooCategory.css";

function CategorySelect() {
  const { voteCode } = useParams();
  const [categories, setCategories] = useState();
  const [selectCategories, setSelectCategories] = useState([]);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [selectedPromises, setSelectedPromises] = useState([]);
  const [candidates, setCandidates] = useState();

  const [currentPage, setCurrentPage] = useState("categorySelect");

  useEffect(() => {
    axios.get(`/nawoo/CategorySelect/${voteCode}`)
    .then((res) => {
      setCandidates(res.data.candidatesInfo);
      setCategories(res.data.categoriesData);
      setSelectedButtons(new Array(Object.keys(res.data.categoriesData).length).fill(false));
      setSelectCategories(new Array(Object.keys(res.data.categoriesData).length).fill(false));
    })
    .catch((err) => {
      console.log(err);
    })
  }, [voteCode]);

  const handleSelectCategory = (category, index) => {
    const newSelectCategories = [...selectCategories]; //선택된 카테고리 배열을 복사한다.
    const newButtonColors = [...selectedButtons];
    
    if(!selectCategories.some(seleteCategory => seleteCategory.key === category)) { //선택한 카테고리가 이미 선택 됐는지 확인한다.
      newSelectCategories[index] = {
        key: category,
        promises: categories[category]
      };
      setSelectCategories(newSelectCategories);//상태에 반영한다.

      newButtonColors[index] = true;
      setSelectedButtons(newButtonColors);
    } else { //재선택을 한다면 취소한다. 
      newSelectCategories[index] = false;
      setSelectCategories(newSelectCategories);

      newButtonColors[index] = false;
      setSelectedButtons(newButtonColors);
    }
  };

  if(!categories) {
    return "gngngn";
  }
  
  return(
    <div>
      {
        (currentPage === "categorySelect") ?
        <Category
          categories={categories}
          selectedButtons={selectedButtons}
          setCurrentPage={(page) => {setCurrentPage(page)}}
          onCategorySelect={(category, index) => {
            handleSelectCategory(category, index)
          }}
        />
        : (currentPage === "promiseSelect") ?
        <Promise
          selectCategories={ selectCategories }
          setCurrentPage={(page) => {setCurrentPage(page)}}
          setPromises={(item) => {setSelectedPromises(item)}}
        />
        :
        <Result
          candidates={candidates}
          selectedPromises={selectedPromises}
        />
      }
    </div>
  )
}

export default CategorySelect;
