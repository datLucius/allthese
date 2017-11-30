import React, { Component } from 'react';
import { Link } from 'react-router';

class DesktopMenu extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseEnter() {
    this.setState({ hover: true });
  }

  onMouseOut() {
    this.setState({ hover: false });
  }

  render() {
    const { name, description, to, color } = this.props;
    return (
      <Link className="desktopmenu-item dib mr4 pointer tc title-w link" style={{ color }} onMouseEnter={this.onMouseEnter} onMouseOut={this.onMouseOut} to={to || '/'}>
        {this.state.hover
          ? <div className="desktopmenu-description ba bw2">{description}</div>
          : <div className="desktopmenu-name ba bw2">{name}</div>
        }
      </Link>
    );
  }
}
export default DesktopMenu;
