import React, { useState } from 'react';
import Makevote from './Makevote';
import Viewvote from './Viewvote';
import make from './make-vote.png';
import set from './set-vote.png';

const AdmainMain = () => {
    const [content, setContent] = useState(null);

    const [notices, setNotices] = useState([]);

    function addData(vote) {
        setNotices([...notices, vote]);
    }

    function MakevoteClick() {
        setContent(<Makevote notices={notices} setNotices={setNotices} />);
    }

    function SetVoteClick() {
        setContent(<Viewvote notices={notices} />);
    }
    return (
        <div>
            <section className="vote-images bg-light text-center mt-5">
                <div className="container">
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
                                <div className="vote-images-icon d-flex" onClick={SetVoteClick}>
                                    <img src={set} className="w-25 h-50 mx-auto d-block" alt="set-vote" />
                                </div>
                                <h3>투표 관리하기</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {content}
            <Viewvote notices={notices} />
        </div>
    )
}

export default AdmainMain;