import { Line } from 'react-chartjs-2';

const LineGraph = ({ lineGraphDatas, voteInfo }) => {
  const labels = [];
  const cumulativeVoteCounts = [];
  const countsByHour = {};
  let cumulativeCount = 0;

  const lineGraphData = lineGraphDatas.map(item => Object.values(item));
  lineGraphData.forEach(item => {
    const timestamp = new Date(item[2]);
    const hour = timestamp.getHours();
    const formattedHour = `${timestamp.getFullYear()}-${(timestamp.getMonth() + 1).toString().padStart(2, '0')}-${timestamp.getDate().toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:00:00`;
  
    if (!countsByHour[formattedHour]) countsByHour[formattedHour] = 0;
    countsByHour[formattedHour]++;
  });

  const startDate = new Date(voteInfo.startDate + 'T09:00:00');
  const endDate = new Date(voteInfo.endDate + 'T18:00:00');
  const lastDate = new Date();
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const formattedHour = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:00:00`;
    const test = new Date(formattedHour);
    labels.push(`${test.getDate().toString().padStart(2, '0')}일${test.getHours().toString().padStart(2, '0')}시`);
    
    if(currentDate <= lastDate) {
      cumulativeCount += countsByHour[formattedHour] || 0;
      cumulativeVoteCounts.push(cumulativeCount);
    }
    currentDate.setHours(currentDate.getHours() + 1);
  }
  
  const data = {
    labels,
    datasets: [{
      label: 'Dataset 1',
      data: cumulativeVoteCounts,
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(229, 229, 229, 0.5)',
      tension: 0.1
    }]
  };

  return (
    <Line data={data} />
  )
}

export default LineGraph;
