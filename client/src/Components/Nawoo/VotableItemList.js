import { Link } from "react-router-dom";
import Loding from '../Main/Loding';
import "./VotableItemList.css";

const VotableItemList = ({voteList}) => {
  return (
    <div className='nw_form'>
      <div className='nw_top'>
        <div className='nw_explain1'>
          <label className='nw_select_1'>나만의 후보찾기</label>
          <label className='nw_select_2'>
            <p className='nw_select_text1'>투표에도 인공지능을 </p>
            <p className='nw_select_text2'>내 성향과 맞는 후보자를 찾고 싶을때</p>
          </label>
        </div>
      </div>
      <div className='nw_middle'>
        <div className='nw_votebox'>
          <div className='nw_votebox_text'>
            <p className='nw_select_text3'> 아래 투표들은 현재 학과에서 진행중인 투표입니다. </p>
            <p className='nw_select_text3'>원하시는 투표를 선택하세요</p>
          </div>
          { !voteList ? <Loding/> : voteList.map((vote, index) => (
            <Link to={`CategorySelect/${voteList[index].voteCode}`} key={index}>
              <div className='nw_votelist'>
                <label className='nw_vote'>
                {vote.title}
                </label>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default VotableItemList;