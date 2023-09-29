import MakeVote from '../Main/images/makeVote.png';
import LineGraph from './LineGraph';
import './GraphMain.css';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const GraphMain = () => {
  return (
    <div className='graph-wrap'>
      <div className='graph-header'>
        <h1>Test</h1>
        <div className='graph-container' >
          <div>
            <img src={MakeVote} alt='img'/>
            <p>실시간 투표율</p>
          </div>
          <div>
            <img src={MakeVote} alt='img'/>
            <p>실시간 투표자수</p>
          </div>
          <div>
            <img src={MakeVote} alt='img'/>
            <p>남은 시간</p>
          </div>
        </div>
      </div>
      <div className='graph-middle'>
        <h1> 실시간 투표율 </h1>
        <LineGraph />
      </div>
      <button> 실시간 투표율 </button>
      <button> 실시간 투표율 </button>
      <button> 실시간 투표율 </button>
      <div className='graph-footer'>
        
      </div>
    </div>
  )
}

export default GraphMain;
