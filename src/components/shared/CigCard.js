import React from 'react';

const CigCard = ({ children }) => (
  <div className="fl w-100 w-50-ns pa4 pointer pa2">
    <div className="bg-blck w-100">
      {children}
    </div>
  </div>
);

export default CigCard;
