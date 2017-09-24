import React from "react";

const ResultRow = ({ result }) => (
  <div className="header-row w-100 flex">
    <div className="w-20 b--white bw1 ba tc flex flex-column justify-center br-0">{result.sessionId || 'NA'}</div>
    <div className="w-10 b--white bw1 ba tc flex flex-column justify-center br-0">{result.subjectId || 'NA'}</div>
    <div className="w-10 b--white bw1 ba tc flex flex-column justify-center br-0">{result.sessionDate || 'NA'}</div>
    <div className="w-20 b--white bw1 ba tc flex flex-column justify-center br-0">{result.sessionTime || 'NA'}</div>
    <div className="w-10 b--white bw1 ba tc flex flex-column justify-center br-0">{result.deviceId || 'NA'}</div>
    <div className="w-20 b--white bw1 ba tc flex flex-column justify-center br-0">{result.sensorDate || 'NA'}</div>
    <div className="w-10 b--white bw1 ba tc flex flex-column justify-center">checkbox</div>
  </div>
);

export default ResultRow;
