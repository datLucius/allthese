import React, { Component } from 'react';
import CigMenuSVG from './CigMenuSVG';
import pages from './pages';
import MobileMenuTitle from './MobileMenuTitle';

class MobileMenu extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <div className="di pointer">
          <div className="menu-svg fixed right-0 top-0" onClick={this.onClick} role="button">
            <CigMenuSVG onClick={this.onClick} />
          </div>
        </div>
        {this.state.open &&
        <div className="cb w-100 bg-white ba bw4 pa2 label-menu" onClick={this.onClick} role="button">
          {pages.map(({ name, description, to }) =>
            (
              <MobileMenuTitle key={name} name={name} description={description} to={to} color={this.props.color} />
            )
          )}
        </div>
      }
      </div>
    );
  }
}
export default MobileMenu;
