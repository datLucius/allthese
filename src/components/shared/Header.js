import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import CigLogo from './CigLogo';

const Header = ({ color }) => (
  <div className="w-100 fixed top-0 bg-white z-2">
    <div className="dn db-ns">
      <div className="justify-between items-center flex pa2">
        <Link to="/about">
          <CigLogo color={color} />
        </Link>
        <DesktopMenu color={color} />
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
