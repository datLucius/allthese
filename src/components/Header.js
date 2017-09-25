import { Link } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import HalfGrid from './shared/HalfGrid';

class Header extends Component {
  render() {
    return (
      <div className="bg-zer-off-white flex">
        <HalfGrid>
          <div className="tc">
            <img src="../public/img/zeriscope_icon.png" className="mw2" />
          </div>
        </HalfGrid>
        <HalfGrid>
          <div className="tc">
            {this.props.loggedIn &&
            <Link className="tc pointer link" to="/signout">
              Sign out
            </Link>}
          </div>
        </HalfGrid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.authReducer.loggedIn
  };
}
export default connect(mapStateToProps)(Header);
