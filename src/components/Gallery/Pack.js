import React from 'react';
import GoogleMap from 'google-map-react';

import CigCard from '../shared/CigCard';

const GoogleMapConfig = {
  key: process.env.API_KEY
};

class GridContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      map: false,
      center: { lat: this.props.item.lat, lng: this.props.item.lng },
      zoom: 12,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 500);
  }

  render() {
    const { item } = this.props;
    return (
      <div className={this.state.visible ? 'solid' : 'clear'} id={item.id} key={item.id} role="button">
        <CigCard>
          {this.state.map
          ? <div>
            <div className="bg-black tc justify-center white pa4 absolute fl z-2"
              role="button"
              onClick={() => { this.setState({ map: !this.state.map }); }}>X</div>
            <div className="bw4 ba bg-black">
              <div className="map">
                <GoogleMap
                  bootstrapURLKeys={GoogleMapConfig}
                  defaultCenter={this.state.center}
                  defaultZoom={this.state.zoom}>
                  <img src={item.img.small} className="ba" alt="cig" lat={item.lat} lng={item.lng} />
                </GoogleMap>
              </div>
            </div>
          </div>
          : <div role="button"
            className="tc"
            onClick={() => {
              if (item.lat) {
                this.setState({ map: !this.state.map });
              }
            }
            }>
            <img src={this.props.item.img.medium} className="image-size bw4 ba" alt="cig" />
          </div>
        }
        </CigCard>
      </div>);
  }
}

export default GridContents;
