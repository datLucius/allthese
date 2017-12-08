import React from 'react';

const CigCard = ({ children, pointer, mapView }) => (
  <div className={pointer && "pointer"}>
    <div className="fl w-100 pa4 pa2 w-50-ns">
      <div className="bg-blck w-100">
        {children}
      </div>
    </div>
  </div>
);

export default CigCard;
