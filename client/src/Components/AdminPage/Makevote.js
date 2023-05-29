import React, { useState } from 'react';
import "./Makevote.css";
import VotePlus from './VotePlus';
import { validateMakeVoteForm } from './errCheck/validateMakeForm';

function Makevote({ data, setData }) {
  const [voteComponents, setVoteComponents] = useState([]);
  const [titleError, setTitleError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [dateError, setdateError] = useState('');
  const [formData, setFormData] = useState({
    id: data.length,
    writer: '전준호', //투표를 만든 사람인가요?
    title: '', //투표 이름입니다.
    type: 'notSelc',
    startDate: '',
    endDate: '',
    name: '', //후보자 이름이 들어옵니다.
    text: '', //후보자의 공약이 들어옵니다.
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDataInsert = (formData) => {
    setData([...data, formData]);
  }

  const addVoteComponent = () => {
    setVoteComponents([...voteComponents, <VotePlus />]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    validateMakeVoteForm(formData, setTitleError, setTypeError, setdateError, handleDataInsert);
  }

  return (
    <>
      <h1 className="custom-title" style={{margin: '5%'}} >투표 만들기</h1>
      <div>
      <form style={{display: 'flex'}} className='make_vote' onSubmit={handleFormSubmit} action='/vote/write' method='post'>
            <div className="rounded-form mt-3" style={{width: '50%', margin: '5% 2.5%'}}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">투표 제목</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="투표 제목을 입력하세요"
                  name="title"
                  onChange={handleChange}
                />
                {titleError && <span style={{color: 'red'}} >{titleError}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="vote-type" className="form-label">투표 종류</label>
                <select className="form-select" id="type" name="type" onChange={handleChange}>
                  <option value="notSelc">투표 종류를 선택하세요</option>
                  <option value="찬반투표">찬반 투표</option>
                  <option value="선택투표">선택 투표</option>
                </select>
                {typeError && <span style={{color: 'red'}} >{typeError}</span>}
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="start-date" className="form-label">투표 시작일</label>
                  <input type="date" className="form-control" name="startDate" onChange={handleChange}/>
                </div>
                <div className="col-6">
                  <label htmlFor="end-date" className="form-label">투표 종료일</label>
                  <input type="date" className="form-control" name="endDate" onChange={handleChange}/>
                </div>
                {dateError && <span style={{color: 'red'}} >{dateError}</span>}
              </div>
              
              <div style={{textAlign: 'center'}}>
                <button type="submit" className="btn btn-dark rounded-pill w-50">등록</button>
              </div>
            </div>      
          
            <div className="rounded-form mt-3" style={{width: '50%', margin: '5% 2.5%'}}>
              <div className="mb-3">
                {voteComponents.map((component, index) => (
                  <div key={index}>
                    <span> 기호{index+1}번 </span>
                    {component}
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn-secondary btn-lg float-right" onClick={addVoteComponent}>
                후보자 추가
              </button>
            </div>
      </form>
      </div>
      
    </>
  )
}

export default Makevote;