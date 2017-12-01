import React from 'react';
import GoogleMap from 'google-map-react';

const CigMap = ({ item }) => (
  <div className="bw4 ba bg-black">
    <div className="map">
      <GoogleMap
        defaultCenter={{ lat: item.lat, lng: item.lng }}
        defaultZoom={12}>
        <div lat={item.lat} lng={item.lng} className="map-pack-container">
          <img src={item.img.small} className="ba expand-enter" alt="cig" lat={item.lat} lng={item.lng} />
        </div>
      </GoogleMap>
    </div>
  </div>
);

export default CigMap;
