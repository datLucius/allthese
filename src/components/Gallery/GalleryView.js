import { connect } from 'react-redux';
import React, { Component } from 'react';

import { updateColor, getCigs } from '../../actions';
import CigGrid from './CigGrid';
import CigLoader from '../shared/CigLoader';


class GalleryView extends Component {
  constructor(props) {
    super(props);
    this.getMoreCigs = this.getMoreCigs.bind(this);
  }

  componentWillMount() {
    this.props.getCigs(this.props.page);
  }

  getMoreCigs() {
    this.props.getCigs(this.props.page);
  }

  render() {
    const { cigs } = this.props;
    return (
      <div onScroll={this.updateDimensions} className="mw9 center ph3-ns mt6 minheight tc">
        <div className="cf ph2-ns z-1">
          {this.props.cigs && <CigGrid items={cigs} />}
        </div>
        {this.props.loading && <div className="center mt6 w-100 tc mb6">
          <CigLoader />
          <div className="loading-message ml4">loading ...</div>
          </div>
        }
        {!this.props.loading && <div className="dib white tc pa4 pointer f3 hover-red" onClick={this.getMoreCigs} role="button">LOAD MORE</div>}
      </div>
    );
  }
}

function mapStateToProps({ cigs }) {
  return {
    color: cigs.color,
    cigs: cigs.cigs,
    page: cigs.page,
    loading: cigs.loading
  };
}

export default connect(mapStateToProps, { updateColor, getCigs })(GalleryView);
