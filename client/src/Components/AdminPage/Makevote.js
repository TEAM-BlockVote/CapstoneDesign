import React, { useState, useEffect } from 'react';
import "./Makevote.css";
import VotePlus from './VotePlus';
import { depDataArray } from '../Register/depDataArray';
import { useRef } from 'react';
import { validateMakeVoteForm } from './errCheck/validateMakeForm';
depDataArray.unshift("ALL");

function Makevote() {
  const [titleError, setTitleError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [dateError, setDateError] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [userDepCard, setUserDepCard] = useState("depcard");
  const [allowedDepartments, setAllowedDepartments] = useState([]);
  const dropdownRef = useRef();

  const today = new Date();
  today.setHours(today.getHours() + 9);
  const todayFormatted = today.toISOString().split('T')[0];

  const handleDepartmentSearch = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchValue(inputValue);
    setUserDepCard("depcard-active");

    const filtered = depDataArray.filter(item => item.includes(inputValue));
    if (filtered.length > 0) {
      setFilteredData(filtered);
    } else {
      setUserDepCard("depcard");
    }
  };

  const handleSelectItem = (item) => {
    if(!allowedDepartments.includes(item)) {
      setAllowedDepartments([...allowedDepartments, item]);
      setVoteInfoData((prevFormData) => ({
        ...prevFormData,
        "allowedDepartments": [...prevFormData.allowedDepartments, item],
      }));
    }
    setSearchValue('');
    setFilteredData([]);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('#allowedDep')) setUserDepCard("depcard");
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const [voteInfoData, setVoteInfoData] = useState({
    writer: '',
    title: '',
    type: 'notSelc',
    startDate: '',
    endDate: '',
    allowedDepartments: []
  });

  const newCandidate = {
    partyName: '',
    candidateNames: [],
    promises: [],
    imagePreview: null,
    partyNumber: 0,
  };

  const [candidateInfo, setCandidateInfo] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoteInfoData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const increaseCandidate = (event) => {
    event.preventDefault();
    newCandidate.partyNumber = candidateInfo.length+1;
    const newFormDataArray = [...candidateInfo, newCandidate];
    setCandidateInfo(newFormDataArray);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    validateMakeVoteForm(voteInfoData, candidateInfo, setTitleError, setTypeError, setDateError, event);
  }

  return (
    <>
      <h1 className="custom-title mt-5" >투표 만들기</h1>
      <div>
        <form className='make_vote' onSubmit={handleFormSubmit} action='/vote/write' method='post'>
          <div className="rounded-form">
            <div className='allowed_dep_card'>
              {allowedDepartments.map((ele, index) => (
                <span className='allowed_dep' key={index}>
                  {ele}
                </span>
              ))}
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div htmlFor="title" className="form-div">투표 제목</div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="투표 제목을 입력하세요"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <div className="form-div">투표가능 학과</div>
                  <input id='allowedDep' className='form-control' type='text' value={searchValue} onClick={handleDepartmentSearch} onChange={handleDepartmentSearch} placeholder="학과를 입력하세요" />
              </div>
              <div className=''>
                {filteredData.length > 0 && (
                  <ul ref={dropdownRef} className={`${userDepCard}`} style={{right: '1rem', width: '46.5%'}}>
                    {filteredData.map((item, index) => (
                      <li key={index}
                        onClick={() => {
                          handleSelectItem(item);
                      }}>
                      {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {titleError && <div style={{  color: 'red' }} >{titleError}</div>}
            </div>
            <div className="mb-3">
              <div htmlFor="vote-type" className="form-div">투표 종류</div>
              <select className="form-select" id="type" name="type" onChange={handleChange}>
                <option value="notSelc">투표 종류를 선택하세요</option>
                <option value="찬반투표">찬반 투표</option>
                <option value="선택투표">선택 투표</option>
              </select>
              {typeError && <div style={{ color: 'red' }} >{typeError}</div>}
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div htmlFor="start-date" className="form-div">투표 시작일</div>
                <input type="date" className="form-control" name="startDate" onChange={handleChange} min={todayFormatted} />
              </div>
              <div className="col-6">
                <div htmlFor="end-date" className="form-div">투표 종료일</div>
                <input type="date" className="form-control" name="endDate" onChange={handleChange} min={voteInfoData.startDate}/>
              </div>
              {dateError && <div style={{ color: 'red' }} >{dateError}</div>}
            </div>
            <div>
              {candidateInfo.map((formData, index) => (
                <VotePlus
                  key={index}
                  id={index}
                  formData={formData}
                  setFormData={setCandidateInfo}
                />
              ))}
              <button className="new-candidate" onClick={increaseCandidate}>
                후보 추가
              </button>
            </div>
          </div>
          <div className='vote_btn_margin'>
            <button type="submit" className="vote_btn">투표 등록</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Makevote;
