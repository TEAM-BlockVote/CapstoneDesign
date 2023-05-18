import React, { useState } from 'react';
import "./Makevote.css";
import VotePlus from './VotePlus';

function Makevote({ data, setData }) {

  const [voteComponents, setVoteComponents] = useState([<VotePlus />]);

  const addVoteComponent = () => {
    setVoteComponents([...voteComponents, <VotePlus />]);
  };

  const handleRegister = (event) => {
    const datas = {
      id: data.length,
      writer: "관리자",
      title: event.target.form.title.value,
      name: event.target.form.name.value,
      type: event.target.form.type.value,
      startDate: event.target.form.startDate.value,
      endDate: event.target.form.endDate.value,
      text: event.target.form.text.value,

    };

    setData([...data, datas]);
  };

  console.log(data.length);

  return (
    <form>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <h1 className="custom-title">투표 만들기</h1>
            <div className="space-between"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="rounded-form mt-3 mx-auto">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">투표 제목</label>
                <input type="text" className="form-control" id="title" placeholder="투표 제목을 입력하세요" />
              </div>
              <div className="mb-3">
                <label htmlFor="vote-type" defaultValue="" className="form-label">투표 종류</label>
                <select className="form-select" id="type">
                  <option disabled>투표 종류를 선택하세요</option>
                  <option value="찬반투표">찬반 투표</option>
                  <option value="선택투표">선택 투표</option>
                </select>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="start-date" className="form-label">투표 시작일</label>
                  <input type="date" className="form-control" id="startDate" />
                </div>
                <div className="col-6">
                  <label htmlFor="end-date" className="form-label">투표 종료일</label>
                  <input type="date" className="form-control" id="endDate" />
                </div>
              </div>
              <div className="mb-3">
                {voteComponents.map((component, index) => (
                  <div key={index}>{component}</div>
                ))}
                <button type="button" className="btn btn-secondary btn-lg float-right" onClick={addVoteComponent}>
                  후보자 추가
                </button>
              </div>
              <button type="button" className="btn btn-dark rounded-pill" onClick={handleRegister}>등록</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Makevote;