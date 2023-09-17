import React, { useState, useEffect, useContext } from 'react';
import Loding from '../Main/Loding';
import "./Result.css";

const Result = ({selectedPromises, candidates}) => {
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

  return (
    <div className='nw_form'>
      <div className='nw_top'>
        <div className='result_title'>
          나와 가장 잘 맞는 사람들
        </div>
      </div>
      <div className='nw_middle'>
        <div className='result_left'>
          <div className='result_label1'>
            우수한 분석 능력
          </div>
          <div className='result_label2'>
            인공 지능을 활용한<br />
            가장 정확한 테스트
          </div>
        </div>
        <div className='result_list'>
          <div className='img_div'>
            {!ranking ? <Loding/> :
              champions.map((winner, index) => (
                <div key={index} className={`${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <div className='result_img'>
                    <img
                      src={winner.partyimage}
                      alt='후보자 사진'
                      className={`${index % 2 === 0 ? 'even_image' : 'odd_image'}`}
                    />
                  </div>
                  <div className={`${index % 2 === 0 ? 'even_label' : 'odd_label'}`}>
                    {winner.partyName} <br/>
                    {winner.candidateName}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className='nw_bottom'>
      </div>
    </div>
  );
}
export default Result;
