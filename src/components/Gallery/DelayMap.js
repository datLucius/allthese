import React, { Component } from 'react';

import GoogleMap from 'google-map-react';


class DelayMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }


  render() {
    const { item } = this.props;
    return (<GoogleMap
      defaultCenter={{ lat: item.lat, lng: item.lng }}
      defaultZoom={12}>
      <div lat={item.lat} lng={item.lng} className="map-pack-container">
        <img src={item.img.small} className="ba expand-enter" alt="cig" lat={item.lat} lng={item.lng} />
      </div>
    </GoogleMap>);
  }
}

export default DelayMap;
