import React from 'react';
import { connect } from 'react-redux';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

const Header = ({ color }) => (
  <div className="w-100 fixed top-0 bg-white z-2 header-bar">
    <div className="fixed right-0 desktop-header">
      <div className="dn db-ns">
        <div className="justify-between items-center flex pa2">
          <DesktopMenu color={color} />
        </div>
      </div>
    </div>
    <div className="dn-ns">
      <MobileMenu color={color} />
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    color: state.cigs.color
  };
}

export default connect(mapStateToProps)(Header);
