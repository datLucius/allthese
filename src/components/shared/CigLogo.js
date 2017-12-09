import React, { Component } from 'react';
import { Link } from 'react-router';

import CigAnime from './CigAnime';
import CigStatic from './CigStatic';

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
      <Link to="/about" onMouseEnter={this.onMouseEnter}>
        <div className="logo-header ml2 pointer">
          { this.state.hover
          ? <CigAnime />
        : <CigStatic />
        }
        </div>
      </Link>
    );
  }
}
export default CigLogo;
