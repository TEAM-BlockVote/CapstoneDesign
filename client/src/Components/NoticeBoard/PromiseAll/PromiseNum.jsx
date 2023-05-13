import React from 'react';
import "./PromiseNum.css";

function PromiseNum({ promise }) {
  return (
    <div className="promise-num">
      {promise.map((p, index) => (
        <div className="promise-card"  key={index}>
          <div className="promise-card-body">
            {p}
          </div>
        </div>
      ))}
      <br />
      <br />
    </div>
  );
}

export default PromiseNum;
