import React, { Component } from 'react';
import { Link } from 'react-router';

import CigAnime from './CigAnime';

class CigLogo extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
  }

  onMouseEnter() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    return (
      <Link to="/about">
        <div className="logo-header ml2 pointer">
          <CigAnime />
        </div>
      </Link>
    );
  }
}
export default CigLogo;
