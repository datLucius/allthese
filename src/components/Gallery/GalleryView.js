import { connect } from 'react-redux';
import React, { Component } from 'react';

import { updateColor, getCigs } from '../../actions';
import CigGrid from './CigGrid';
import CigLoader from '../shared/CigLoaderWhite';
import CigLoad from '../shared/CigLoad';


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
      <div className="mw9 center ph3-ns mt2 minheight tc mb6">
        <div className="cf ph2-ns z-1">
          {this.props.cigs && <CigGrid items={cigs} />}
        </div>
        <div className="mt6">
          {this.props.loading && <div className="center w-100 tc">
            <CigLoader />
            <div className="loading-message ml4">loading ...</div>
            </div>
          }</div>
          {!this.props.loading &&
            <div onClick={this.getMoreCigs} role="button" className="pointer">
              <CigLoad />
              <div className="loading-message ml4">load more?</div>
            </div>}
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
