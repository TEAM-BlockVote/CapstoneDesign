import { useEffect, useState } from "react";
import "./NawooResult.css";

function Result({selectedPromises, candidates}) {
  const [ranking, setRanking] = useState();
  const [champions, setChampions] = useState();

  useEffect(() => {
    const candidateData = {};
    
    selectedPromises.map((data, index) => { //선택한 공약의 후보자 번호로 공약을 압축한다.
      if(!candidateData[data.candidateNumber]) {
        candidateData[data.candidateNumber] = [];
      }
      candidateData[data.candidateNumber].push(data.promise);
      return candidateData;
    });
    
    const promiseLength = Object.entries(candidateData).map(([key, value]) => ({ candidateNumber: parseInt(key), length: value.length })); // 압축한 데이터를 정렬을 위해 key - value쌍으로 변환한다.
    promiseLength.sort((a, b) => b.length - a.length); //promise length로 정렬한다.
    const maxLength = Math.max(...promiseLength.map(item => item.length)); //공약 개수의 최대값을 찾는다.
    const winnerCandidate = promiseLength.filter(item => item.length === maxLength); // 최대값과 똑같은 데이터를 복사한다.

    const champions = candidates.map(candidate => {
      if (winnerCandidate.some(target => target.candidateNumber === candidate.partyNumber))
        return candidate;
      return null;
    }).filter(candidate => candidate !== null);

    setChampions(champions);
    setRanking(winnerCandidate);
  }, [selectedPromises, candidates])
  
  if(!ranking) {
    return "asd";
  }

  return(
    <div className='nawoo_form'>
      <div className='result'>
        <div className='result_top'>
          <div className="result_logo">
            당신만을 위한 후보자는 누구?!
            <br/>
            사진을 클릭하세요!
          </div>
        </div>
        <div className='result_middle'>
          {champions.map((winner, index) => (
            <div key={index}>
              <div className='result_img'>
                <img src={winner.partyimage} alt='후보자 사진' className='list_img'/>
              </div>
              <div>
                {winner.partyName} <br/>
                {winner.candidateName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Result;
