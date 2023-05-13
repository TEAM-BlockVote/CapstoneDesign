
import React from 'react';

function PromiseNum({ promise }) {
  return (
    <>
      {promise.map((p, index) => (
        <div className="card" style={{width: "70%", margin: "auto"}} key={index}>
          <div className="card-body">
            {p}
          </div>
        </div>
      ))}
      <br />
      <br />
    </>
  );
}

export default PromiseNum;
