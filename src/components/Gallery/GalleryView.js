import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router';

import { updateColor, getCigs } from '../../actions';
import CigGrid from './CigGrid';
import CigLoader from '../shared/CigLoader';
import CigLogo from '../shared/CigLogo';


class GalleryView extends Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateDimensions);
  }

  componentWillMount() {
    this.props.getCigs(this.props.page);
  }

  updateDimensions() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.getMoreCigs();
    }
  }

  getMoreCigs() {
    if (!this.props.loading) {
      this.props.getCigs(this.props.page);
    }
  }

  render() {
    const { cigs } = this.props;
    return (
      <div>
        <Link to="/about">
          <div className="logo-header">
            <CigLogo />
          </div>
        </Link>
        <div onScroll={this.updateDimensions} className="mw9 center ph3-ns mt6 minheight">
          <div className="cf ph2-ns">
            {this.props.cigs && <CigGrid items={cigs} />}
          </div>
          {this.props.loading &&
            <div className="center mt6 w-100 tc mb6">
              <CigLoader />
              <div className="loading-message ml4">loading ...</div>
            </div>}
        </div>
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
