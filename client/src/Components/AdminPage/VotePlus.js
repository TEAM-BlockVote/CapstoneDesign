import React, { useState } from "react";
import './votePlus.css';

import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';

import ImgSvg from  './ImgSvg';
import CandidateNameForm from './CandidateNameForm';
import CandidatePromiseForm from './CandidatePromiseForm';

function VotePlus({id, formData, setFormData}) {

  const [labelDisplay, setLabelDisplay] = useState("");
  const [candidateNameCount, setCandidateCount] = useState(1);
  const [candidatePromiseCount, setcandidatePromiseCount] = useState(1);
  const [showVotingModal, setShowVotingModal] = useState(false);

  const handleVotingModalClose = (event) => {
    setShowVotingModal(false);
  }

  const handleVotingModalShow = (event) => {
    event.preventDefault();
    setShowVotingModal(true);
  }

  const updateFormDataImgPartyName = (index, propertyName, newValue) => {
    setFormData((prevDataArray) => {
      const updatedArray = prevDataArray.map((formData, i) => {
        if (i === index) {
          return {
            ...formData,
            [propertyName]: newValue,
          };
        }
        return formData;
      });
      return updatedArray;
    });
  };

  const updateFormDataArray = (id, index, propertyName, newValue) => {
    setFormData((prevDataArray) => {
      const updatedArray = prevDataArray.map((formData, i) => {
        if (i === id) {
          const updatedNames = [...formData[propertyName]];
          updatedNames[index] = newValue;
          return {
            ...formData,
            [propertyName]: updatedNames,
          };
        }
        return formData;
      });
      return updatedArray;
    });
  };

  const handleCandidateNameChange = (index, newName) => {
    updateFormDataArray(id, index, "candidateNames", newName); //id 현재 form 인덱스 index 이름 배열 인덱스
  };

  const handleCandidatePromiseChange = (index, newPromise) => {
    updateFormDataArray(id, index,  "promises", newPromise);
  };

  const handleCandidatePartyNameChange = (e) => {
    updateFormDataImgPartyName(id, "partyName", e.target.value);
  };
  
  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      updateFormDataImgPartyName(id, "imagePreview", reader.result);
      setLabelDisplay("none");
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const increaseCandidateCount = (event) => {
    event.preventDefault();
    setCandidateCount((prevCount) => prevCount + 1);
  }

  const increasePromiseCount = (event) => {
    event.preventDefault();
    setcandidatePromiseCount((prevCount) => prevCount + 1);
  }

  return (
    <div className="file-upload-wrapper">
      
      <div style={{display: labelDisplay}}>
        <label htmlFor={id} className="file-upload-label">
          <ImgSvg/>
          <input type="file" className="inputFile" id={id} onChange={handleImageChange} accept="image/*"/>
        </label>
      </div>
      {formData.imagePreview && (
        <div style={{display: "flex"}}>
          <div className="candidate-img-wrapper">
            <img src={formData.imagePreview} alt="Preview" className="candidate-img" />
            <input onChange={handleCandidatePartyNameChange} className="candidate-name-input" placeholder="정당 이름"/>
          </div>
          <div className="candidate-name-wrapper">
            <div className="candidate-name-inputs">
              {[...Array(candidateNameCount)].map((_, index) => (
                <CandidateNameForm key={index} id={index} onNameChange={(index, newName) => handleCandidateNameChange(index, newName)} />
              ))}
            </div>
            <div>
              <button style={{width: '50%', border: '2px #d1d5db solid', backgroundColor: '#fff', borderRadius: '0.5rem'}} onClick={increaseCandidateCount}> 팀원 추가</button>
              <button style={{width: '50%', border: '2px #d1d5db solid', backgroundColor: '#59a2ff', color: 'white', borderRadius: '0.5rem'}} onClick={handleVotingModalShow}> 공약 추가</button>
            </div>
          </div>
        </div>
      )}
      <Modal show={showVotingModal} onHide={handleVotingModalClose} centered>
        <Modal.Header style={{ borderBottom: 'rgb(222,222,222)' }}>
          <CloseButton onClick={handleVotingModalClose} />
        </Modal.Header>
        <Modal.Body>
          {[...Array(candidatePromiseCount)].map((_, index) => (
            <CandidatePromiseForm key={index} id={index} promise={formData.promises} onPromiseChange={(index, newPromise) => handleCandidatePromiseChange(index, newPromise)}/>
          ))}
          <div>
            <button style={{width: '50%', border: '2px #d1d5db solid', backgroundColor: '#59a2ff', color: 'white', borderRadius: '0.5rem'}} onClick={increasePromiseCount}> 공약 추가</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VotePlus;
