import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BarGraph = ({ barGraphDatas }) => {

  const [pieGraphDepartmentsData, setPieGraphDepartmentsData] = useState([]);
  const [pieGraphVotecountsData, setPieGraphVotecountsData] = useState([]);

  console.log(barGraphDatas);
  useEffect(() => {
    const departmentCounts = {};
    barGraphDatas.forEach(data => {
      const department = data.department;
      if (departmentCounts.hasOwnProperty(department)) departmentCounts[department]++;
      else departmentCounts[department] = 1;
    });
    const dataArray = Object.entries(departmentCounts);
    dataArray.sort((a, b) => b[1] - a[1]);
    const sortedData = {};
    for (const entry of dataArray) {
      sortedData[entry[0]] = entry[1];
    }
    setPieGraphDepartmentsData(Object.keys(sortedData));
    setPieGraphVotecountsData(Object.values(sortedData))
  }, [barGraphDatas]);
  
  const labels = pieGraphDepartmentsData;
  const data = {
    labels,
    datasets: [
      {
        label: '학과',
        data: pieGraphVotecountsData,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      } 
    ]
  };
  return (
    <Bar data={data}/>
  )
}

export default BarGraph;