import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TestCandidateSelect = () => {
  const { voteCode } = useParams();

  useEffect(() => {
    axios.get(`/board/CandidateSelect/${voteCode}`)
    .then((res) => {
     console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [voteCode]);

  return (
    <div>
      asda
    </div>
  )
}

export default TestCandidateSelect;