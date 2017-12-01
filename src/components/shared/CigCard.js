import React from 'react';

const CigCard = ({ children, pointer }) => (
  <div className={pointer && "pointer"}>
    <div className="fl w-100 w-50-ns pa4 pa2">
      <div className="bg-blck w-100">
        {children}
      </div>
    </div>
  </div>
);

export default CigCard;
