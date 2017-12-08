import React, { Component } from 'react';
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
      <div className="fixed ml2 pointer z-3">
        <CigAnime />
      </div>
    );
  }
}
export default CigLogo;
