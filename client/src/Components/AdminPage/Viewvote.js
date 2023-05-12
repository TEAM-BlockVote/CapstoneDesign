import React, { useState } from "react";
import './css.css';


function Viewvote({notices}) {

    console.log(notices);

    return (
        <div>
            {notices && notices.map((notice, index) => (
                <div className="board_wrap" key={index}>
                    <div className="board_view_wrap">
                        <div className="board_view">
                            <div className="title">
                                <h2>{notice.title}</h2>
                            </div>
                            <div className="info">
                                <dl>
                                    <dt>투표 기간</dt>
                                    <dd>{notice.start_date} - {notice.end_date}</dd>
                                </dl>
                                <dl>
                                    <dt>투표 유형</dt>
                                    <dd>{notice.vote_type}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Viewvote;