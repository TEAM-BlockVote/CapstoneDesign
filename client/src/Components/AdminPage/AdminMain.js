import React, { useState } from 'react';
import Makevote from './Makevote';
import Viewvote from './Viewvote';
import make from '../AdminPage/images/make-vote.png';
import set from '../AdminPage/images/set-vote.png';
import man1 from '../AdminPage/images/man1.png'
import man2 from '../AdminPage/images/man2.png'
import man3 from '../AdminPage/images/man3.png'
import man4 from '../AdminPage/images/man4.png'

const AdminMain = (props) => {

  const dataDummy = [
		{
			id: 0,
			writer: "김철수",
			title: "투표 1",
			name: "전준호",
			type: " 찬반 투표 ",
			startDate: "2023-03-05",
			endDate: "2023-07-25",
			// photo: man1,
			text: "학교 화장실 시설 개선",
		},
		{
			id: 1,
			writer: "김영희",
			title: "투표 2",
			name: "이서진",
			type: "선택 투표 ",
			startDate: "2023-03-07",
			endDate: "2023-06-28",
			// photo: man2,
			text: "학교 축제에 최예나 섭외",
		},
		{
			id: 2,
			writer: "김민수",
			title: "투표 3",
			name: "유승민",
			type: "선택 투표 ",
			startDate: "2023-10-07",
			endDate: "2023-12-28",
			// photo: man3,
			text: "학교 도셔관 책 다양화",
		},
		{
			id: 3,
			writer: "김정은",
			title: "투표 4",
			name: "나윤성",
			type: "찬반 투표 ",
			startDate: "2023-01-07",
			endDate: "2023-11-30",
			// photo: man4,
			text: "학교 운동장 잔디 설치",
		}
	];

  const [data, setData] = useState(dataDummy);
  const [content, setContent] = useState('');

  function MakevoteClick() {
    setContent(<Makevote data={data} setData={setData} />);
  }

  function setViewClick() {
    setContent(<Viewvote data={data} />);
  }

  return (
    <div>
      <section className="vote-images bg-light text-center mt-5">
        <div className="container2">
          <div className="row">
            <div className="col-6">
              <div className="vote-images-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="vote-images-icon d-flex" onClick={MakevoteClick}>
                  <img src={make} id='make_vote' className="w-25 h-50 mx-auto d-block" alt="make-vote" />
                </div>
                <h3>투표 만들기</h3>
              </div>
            </div>
            <div className="col-6">
              <div className="vote-images-item mx-auto mb-0 mb-lg-3">
                <div className="vote-images-icon d-flex" onClick={setViewClick}>
                  <img src={set} className="w-25 h-50 mx-auto d-block" alt="set-vote" />
                </div>
                <h3>투표 관리하기</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {content}
    </div>
  )
}

export default AdminMain;