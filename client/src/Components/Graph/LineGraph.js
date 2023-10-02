import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
const LineGraph = () => {
  useEffect(() => {
    axios.get('graph/write')
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      
    })
  }, []);
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 4, 5, 6, 7],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return (
    <Line data={data} />
  )
  
}

export default LineGraph;