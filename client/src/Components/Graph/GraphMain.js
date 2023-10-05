import { useState, useEffect } from 'react';
import Loding from '../Main/Loding';
import LineGraph from './LineGraph';
import PieGraph from './PieGraph';
import BarGraph from './BarGraph';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './GraphMain.css';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
Chart.register( ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler );

const GraphMain = () => {
  const { voteCode } = useParams();
  const [graph, setGraph] = useState('');
  const [candidates, setCandidates] = useState('');
  const [voteInfo, setVoteInfo] = useState('');
  const [GraphData, setGraphData] = useState('');
  const [totalVotes, setTotalVotes] = useState(0);
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    axios.get(`/graph/voteInfo/${voteCode}`)
    .then((res) => {
      formatTime(new Date(res.data.voteInfo.endDate + 'T18:00:00'));
      const votes = res.data.pieGraphData.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.votes;
      }, 0);
      setTotalVotes(votes);
      setCandidates(res.data.pieGraphData);
      setVoteInfo(res.data.voteInfo);
      setGraphData(res.data.lineGraphData);
      setGraph(<LineGraph lineGraphDatas={res.data.lineGraphData} voteInfo={res.data.voteInfo}/>);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [voteCode]);

  const formatTime = (endDate) => {
    const currentDateDate = new Date();
    const timeDifference = endDate - currentDateDate;
    let seconds = timeDifference / 1000;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    return setRemainingTime(`${days}일 ${hours.toString().padStart(2, '0')}시 ${minutes.toString().padStart(2, '0')}분`);
  };

  if(!voteInfo && !candidates)
    return <Loding/>

  return (
    <div className='graph-wrap'>
      <div className='graph-header'>
        <h1 className='graph-title'>{voteInfo.title}</h1>
        <div className='graph-container' >
          <div className='graph-property'>
            <p>실시간 투표율</p>
            <span>{totalVotes === 0 ? '0%' : `${(totalVotes / 157 * 100).toFixed(2)}%`}</span>
          </div>
          <div className='graph-property'>
            <p>총 투표자수</p>
            <span>{`${totalVotes}`}명</span>
          </div>
          <div className='graph-property'>
            <p>남은 시간</p>
            <span>{ remainingTime }</span>
          </div>
        </div>
      </div>
      <div className='graph-middle'>
        <h1> 실시간 투표수 </h1>
        {graph}
      </div>
      <div className='graph-middle_buttons'>
        <button className='graph-middle_button' onClick={ () => {setGraph(<LineGraph lineGraphDatas={GraphData} voteInfo={voteInfo} />)}}> 실시간 투표수 </button>
        <button className='graph-middle_button' onClick={ () => {setGraph(<PieGraph candidates={candidates} />)} }> 후보자별 투표율 </button>
        <button className='graph-middle_button' onClick={ () => {setGraph(<BarGraph barGraphDatas={GraphData}/>)} }> 학과별 투표율 </button>
      </div>
      <div className='graph-footer'>
        <h1> SNS에 공유하기! </h1>
        <p> sns을 통해 친구들에게 투표가 진행중임을 알려주세요 </p>
      </div>
    </div>    
  )
}

export default GraphMain;
