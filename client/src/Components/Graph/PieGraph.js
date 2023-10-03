import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const PieGraph = () => {
  useEffect(() => {
    axios.get('graph/pie')
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      
    })
  }, []);
  const data = {
    labels: ['기호1번 전준호;박준호', '기호2번 나윤성;김호민', '기호3번 이서진;유승민'],
    datasets: [
      {
        label: '득표수',
        data: [16, 19, 16],
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