import React, { Component } from 'react';
import { Link } from 'react-router';

class MobileMenuTitle extends Component {
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
    const { name, description, to } = this.props;
    return (
      <Link className="pointer tc title-w link" style={{ color: this.props.color }} onMouseEnter={this.onMouseEnter} onMouseOut={this.onMouseOut} to={to || '/'}>
        {this.state.hover
          ? <div className="f3 lh-copy">{description}</div>
          : <div className="f3 lh-copy">{name}</div>
        }
      </Link>
    );
  }
}
export default MobileMenuTitle;
