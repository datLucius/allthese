import React, { Component } from 'react';

class Location extends Component {
  constructor() {
    super();
    this.state = {
      color: '#6C7A89'
    };
    this.puff();
  }

  getRandomMillisecond() {
    return Math.random() * 5000;
  }

  puff(color) {
    let changeColor = "#FF0000";
    if (color === "#FF0000") {
      changeColor = "#6C7A89";
    }
    setTimeout(() => {
      this.setState({ color: changeColor });
      this.puff(changeColor);
    }, this.getRandomMillisecond());
  }

  render() {
    const { country, extra } = this.props.location;
    return (
      <div className="location dib">
        <div style={{ backgroundColor: this.state.color }} className="h1 w-100" />
        <div className="bg-black white pa2 pb0 relative">
          <div className="pa2">{country}</div>
          <div className="bg-white black">
            {extra.map(data => <div className="pa2">{data}</div>)}
          </div>
        </div>
      </div>
    );
  }
}
export default Location;
