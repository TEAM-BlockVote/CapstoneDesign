import { candidatesData }  from './candidatesData';
import './VotingMain.css';

const VotingMain = () => {
  return (
  <div className="voting_wrapper">
    <ul className="candidate_start">
      {candidatesData.map((element, index) => (
        <li key={index} className='vote-candidate-list'>
          <div>
            <div>
              <img src={element.img} alt='googleimg' className='list_img'/>
            </div>
            <div className='candidate_info'>
              <span className='candidate_num'> {element.partyNumber} </span>
              <div className='candidate_title'>
                <strong className='party_name' > {element.partyName} </strong>
                <h4 className='candidates_name' >{element.candidatesName}</h4>
              </div>
            </div>
            <div>
              <span className='vote_percent'> {element.votePercent} </span>
              <span> {element.voteCount}표</span>
              <div className='graph'>
                <p style={{width: element.votePercent, height: '3px', background: '#767edb'}}></p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default VotingMain;
