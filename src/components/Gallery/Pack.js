import React from 'react';

import CigCard from '../shared/CigCard';
import CigMap from './CigMap';
import MapIcon from '../shared/MapIcon';

class GridContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      map: false,
      hasmap: false
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
        <CigCard pointer={item.lat}>
          {this.state.map
          ?
            <div>
              <div className="bg-black tc justify-center white pa4 absolute fl z-2"
                role="button"
                onClick={() => { this.setState({ map: !this.state.map }); }}>X</div>
              <CigMap item={item} />
            </div>
          :
            <div role="button"
              className="tc pack-hover"
              onClick={() => {
                if (item.lat) {
                  this.setState({ map: !this.state.map, hasmap: true });
                }
              }}>
              <div className="map-icon-container bg-black pa2">
                <MapIcon />
              </div>
              <img src={this.props.item.img.medium} className="image-size bw4 ba" alt="cig" />
            </div>
        }
        </CigCard>
      </div>);
  }
}

export default GridContents;
