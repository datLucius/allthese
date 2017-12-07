import React, { Component } from 'react';
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
      <div className="fixed ml2 pointer" onMouseEnter={this.onMouseEnter}>
        {this.state.hover
          ? <CigAnime />
          : <CigStatic />
        }
      </div>
    );
  }
}
export default CigLogo;
