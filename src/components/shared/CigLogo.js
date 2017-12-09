import React, { Component } from 'react';
import { Link } from 'react-router';

import CigAnime from './CigAnime';
import CigStatic from './CigStatic';

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
      <Link to="/about" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
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
