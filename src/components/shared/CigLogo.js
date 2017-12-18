import React, { Component } from 'react';
import { Link } from 'react-router';

import CigAnime from './CigAnime';

class CigLogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
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
