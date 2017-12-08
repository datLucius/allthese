import React from 'react';
import DelayMap from './DelayMap';

const CigMap = ({ item }) => (
  <div className="bw4 ba bg-black">
    <div className="map">
      <DelayMap item={item} />
    </div>
  </div>
);

export default CigMap;
