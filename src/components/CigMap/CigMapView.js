import { connect } from 'react-redux';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { updateColor } from '../../actions';

class CigMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 59.95, lng: 30.33 },
      zoom: 11
    };
  }

  componentWillMount() {
    this.props.updateColor(this.props.color);
  }

  render() {
    return (
      <div className="map">
        <GoogleMapReact
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <div>hello</div>
        </GoogleMapReact>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    color: state.cigs.color
  };
}

export default connect(mapStateToProps, { updateColor })(CigMapView);
