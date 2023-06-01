import React, { useState, useEffect } from 'react';
import Makevote from './Makevote';
import Viewvote from './Viewvote';
import axios from 'axios';
import Tab from '../Main/Tab';

const AdminMain = (props) => {
	const [data, setData] = useState('');
	useEffect(() => {
		axios.get('/vote/view')
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
	}, []);

	console.log(data);

	const [content, setContent] = useState(<Makevote />);;
	const [selectedTab, setSelectedTab] = useState(<Tab index={0}/>);
	const [activeIndex, setActiveIndex] = useState(0);



	function MakevoteClick(tab,index) {
		setContent(<Makevote data={data} setData={setData} />);
		setSelectedTab(tab);
		setActiveIndex(index);
	}

	function setViewClick(tab,index) {
		setContent(<Viewvote data={data} />);
		setSelectedTab(tab);
		setActiveIndex(index);
	}

	return (
		<div>
			<div className="container mt-5">
					<div className="row">
								<div className="tab-wrapper">
									<ul className="tabs-list col-12">
										<li className={activeIndex === 0 ? 'tab active2' : 'tab2'} onClick={() => MakevoteClick(<Tab index={0} />, 0)}>투표 만들기</li>
										<li className={activeIndex === 1 ? 'tab active2' : 'tab2'} onClick={() => setViewClick(<Tab index={1} />, 1)}>투표 관리하기</li>
									</ul>
								</div>
							</div>
			</div>
			{content}
		</div>
	)
}

export default AdminMain;