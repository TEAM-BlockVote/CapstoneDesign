import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BarGraph = () => {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [13, 123, 54, 23, 65, 143, 51],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      } 
    ]
  };
  return (
    <Bar data={data}/>
  )
}

export default BarGraph;