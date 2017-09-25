import { Link } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { logOutUser } from './../actions';

import HalfGrid from './shared/HalfGrid';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  handleSignOutClick() {
    this.props.logOutUser();
  }

  render() {
    return (
      <div className="bg-zer-off-white flex">
        <HalfGrid>
          <div className="tc">
            <img src="../public/img/zeriscope_icon.png" className="mw2" alt="logo" />
          </div>
        </HalfGrid>
        <HalfGrid>
          {this.props.loggedIn && <div className="tc pointer" onClick={() => this.handleSignOutClick()} role="button">
            Sign Out
          </div>}
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
export default connect(mapStateToProps, {
  logOutUser
})(Header);
