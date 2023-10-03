import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const PieGraph = ({ candidates }) => {
  const [pieGraphVoteCountData, setPieGraphVoteCountData] = useState([]);
  const [pieGraphPartyNameData, setPieGraphPartyNameData] = useState([]);

  useEffect(() => {
    candidates.map(candidate => {
      setPieGraphVoteCountData(prevData => [...prevData, candidate.votes]);
      setPieGraphPartyNameData(prevData => [...prevData, `기호${candidate.partyNumber}번 ${candidate.partyName}`]);
      return 0;
    });
  }, [candidates]);

  const data = {
    labels: pieGraphPartyNameData,
    datasets: [
      {
        label: '득표수',
        data: pieGraphVoteCountData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Pie data={data}></Pie>
  )
}

export default PieGraph;