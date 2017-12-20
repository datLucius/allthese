import { connect } from 'react-redux';
import React, { Component } from 'react';
import moment from 'moment';

import { updateColor } from '../../actions';

import BlackBox from '../shared/BlackBox';
import LocationEl from './Location';
import locations from '../shared/locations';

class VideoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: moment().diff('2012-07-05', 'days')
    };
  }

  componentWillMount() {
    this.props.updateColor(this.props.color);
  }

  render() {
    const { color } = this.props;
    return (
      <div>
        <div className="mt5 mw8 center z-1 mb2">
          <h1 className="playfair f-subheadline lh-title pa4 tc">Hey, check out all these cigarette packs I found</h1>
          <div className="w-100 flex justify-center">
            <BlackBox>
              <iframe src="https://player.vimeo.com/video/225338191?autoplay=1&loop=1" width="320" height="426" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen title="cig_video" autoPlay />
            </BlackBox>
          </div>
          <div className="w-100 mt2 pa4 flex justify-center">
            <div className="f3">
              <div className="lh-copy" style={{ color }}>1289<span className="black"> packs</span></div>
              <div className="lh-copy" style={{ color }}>{this.state.days} <span className="black" >days</span></div>
            </div>
          </div>
          <div className="f3 tc w-100">
            <div className="lh-copy" style={{ color }} />
          </div>
        </div>
        <div className="bb w-100 b--moon-gray overflow-x-scroll justify-between flex items-end bw2 pt4 mb6 smoke-chamber">
          <div className="lh-title w-100 tc white f1 absolute self-start">@</div>
          {locations.map(location => <LocationEl location={location} />)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    color: state.cigs.color
  };
}

export default connect(mapStateToProps, { updateColor })(VideoView);
