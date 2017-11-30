import React, { Component } from 'react';

class CigMenuSVG extends Component {
  constructor() {
    super();
    this.state = {
      cig_1: "#6C7A89",
      cig_2: "#FF0000",
      cig_3: "#6C7A89"
    };
    this.puff(this.state.cig_1, "cig_1");
    this.puff(this.state.cig_2, "cig_2");
    this.puff(this.state.cig_3, "cig_3");
  }

  getRandomMillisecond() {
    return Math.random() * 5000;
  }

  puff(color, cig) {
    let changeColor = "#FF0000";
    if (color === "#FF0000") {
      changeColor = "#6C7A89";
    }
    setTimeout(() => {
      this.setState({ [cig]: changeColor });
      this.puff(changeColor, cig);
    }, this.getRandomMillisecond());
  }

  render() {
    return (
      <svg version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        width="35px"
        height="28px"
        viewBox="0 0 35 28"
        className="cig-trans">
        <g>
          <g>
            <rect x="9" width="26" fill="#eee" height="6" />
          </g>
        </g>
        <g>
          <g>
            <rect fill={this.state.cig_1} className="cig-trans" width="7" height="6" />
          </g>
        </g>
        <g>
          <g>
            <rect x="9" y="22" width="26" fill="#eee" height="6" />
          </g>
        </g>
        <g>
          <g>
            <rect y="22" fill={this.state.cig_2} className="cig-trans" width="7" height="6" />
          </g>
        </g>
        <g>
          <g>
            <g>
              <rect y="11" width="26" fill="#eee" height="6" />
            </g>
          </g>
          <g>
            <g>
              <rect x="28" y="11" fill={this.state.cig_3} className="cig-trans" width="7" height="6" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}
export default CigMenuSVG;
