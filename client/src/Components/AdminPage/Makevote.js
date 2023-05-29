import React, { useState } from 'react';
import "./Makevote.css";
import VotePlus from './VotePlus';
import titleCheck from './errCheck/titleCheck';
import nameCheck from './errCheck/nameCheck';
import typeCheck from './errCheck/typeCheck';
import dateCheck from './errCheck/dateCheck';
import textCheck from './errCheck/textCheck';

function Makevote({ data, setData }) {

  const [voteComponents, setVoteComponents] = useState([<VotePlus />]);
  const [voteTitle, setVoteTitle] = useState("");
  const [voteTitleErr, setVoteTitleErr] = useState("");
  const [voteName, setVoteName] = useState("");
  const [voteNameErr, setvoteNameErr] = useState("");
  const [voteType, setVoteType] = useState("");
  const [voteTypeErr, setVoteTypeErr] = useState("");
  const [voteStartDate, setVoteStartDate] = useState("");
  const [voteEndDate, setVoteEndDate] = useState("");
  const [voteDateErr, setVoteDateErr] = useState("");
  const [voteText, setVoteText] = useState("");
  const [voteTextErr, setVoteTextErr] = useState("");

  const addVoteComponent = () => {
    setVoteComponents([...voteComponents, <VotePlus />]);
  };

  // const handleRegister = (event) => {
  //   const datas = {
  //     id: data.length,
  //     writer: "관리자",
  //     title: event.target.form.title.value,
  //     name: event.target.form.name.value,
  //     type: event.target.form.type.value,
  //     startDate: event.target.form.startDate.value,
  //     endDate: event.target.form.endDate.value,
  //     text: event.target.form.text.value,

  //   };

  //   setData([...data, datas]);
  // };

  // console.log(data.length);

  const voteSubmit = (event) => {

    console.log(voteType);
    console.log(voteTitle);
    console.log(voteStartDate);
    console.log(voteEndDate);

    event.preventDefault();

    const titleErr = titleCheck(voteTitle);

    
    if (titleErr) {
      return setVoteTitleErr(titleErr);
    } else {
      setVoteTitleErr("");
    }

    const nameErr = nameCheck(voteName);
    if (nameErr) {
      return setvoteNameErr(nameErr);
    } else {
      setvoteNameErr("")
    }

    const typeErr = typeCheck(voteType);
    if (typeErr) {
      return setVoteTypeErr(typeErr);
    } else {
      setVoteTypeErr("");
    }

    const dateErr = dateCheck(voteStartDate, voteEndDate)
    if (dateErr) {
      return setVoteDateErr(dateErr);
    } else {
      setVoteDateErr("");
    }

    const textErr = textCheck(voteText)
    if (textErr) {
      return setVoteTextErr(textErr);
    } else {
      setVoteTextErr("");
    }

    event.target.submit();
  }

  return (
    <form className='make_vote' onSubmit={voteSubmit} action='/vote/write' method='post'>
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
                <input type="text" className="form-control" onChange={(e) => setVoteTitle(e.target.value)} placeholder="투표 제목을 입력하세요" />              </div>
              <div className="mb-3">
                <label htmlFor="vote-type" className="form-label">투표 종류</label>
                <select className="form-select" id="type" onChange={(e) => setVoteType(e.target.value)}>
                  <option value="notSelc">투표 종류를 선택하세요</option>
                  <option value="찬반투표">찬반 투표</option>
                  <option value="선택투표">선택 투표</option>
                </select>
              </div>
              <div className="row mb-3">
                <div className="col-6">s
                  <label htmlFor="start-date" className="form-label">투표 시작일</label>
                  <input type="date" className="form-control" value={voteStartDate} onChange={(e) => setVoteStartDate(e.target.value)} />
                </div>
                <div className="col-6">
                  <label htmlFor="end-date" className="form-label">투표 종료일</label>
                  <input type="date" className="form-control" value={voteEndDate} onChange={(e) => setVoteEndDate(e.target.value)} />
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
              <button type="submit" className="btn btn-dark rounded-pill">등록</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Makevote;