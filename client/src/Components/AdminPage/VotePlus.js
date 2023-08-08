import React, { useState, useRef } from "react";
import './votePlus.css';

import ImgSvg from  './ImgSvg';
import CandidateNameForm from './CandidateNameForm';

function VotePlus({id}) {
  const [candidateInfo, setCandidateInfo] = useState({
    name: '',
    imagePreview: null,
  });

  const [labelDisplay, setLabelDisplay] = useState("");
  const [candidateNameCount, setCandidateCount] = useState(1);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCandidateInfo((prevInfo) => ({
        ...prevInfo,
        imagePreview: reader.result,
      }));
      setLabelDisplay("none");
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const increaseCount = (event) => {
    event.preventDefault();
    setCandidateCount((prevCount) => prevCount + 1);
  }

  return (
    <div className="file-upload-wrapper">
      <div style={{display: labelDisplay}}>
        <label htmlFor={id} className="file-upload-label">
          <ImgSvg/>
          <input type="file" className="inputFile" id={id} onChange={handleImageChange} accept="image/*"/>
        </label>
      </div>
      {candidateInfo.imagePreview && (
        <div style={{display: "flex"}}>
          <div className="candidate-img-wrapper">
            <img src={candidateInfo.imagePreview} alt="Preview" className="candidate-img" />
            <input className="candidate-name-input" placeholder="정당 이름"/>
          </div>
          <div className="candidate-name-wrapper">
            <div className="candidate-name-inputs">
              {[...Array(candidateNameCount)].map((_, index) => (
                <CandidateNameForm key={index}/>
              ))}
            </div>
          <div>
            <button style={{width: '50%', border: '2px #d1d5db solid', backgroundColor: '#fff', borderRadius: '0.5rem'}} onClick={increaseCount}> 팀원 추가</button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VotePlus;
