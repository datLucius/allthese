import React from 'react';
import { Link } from 'react-router';

import CigStatic from './CigStatic';

const CigLogo = () => (
  <Link to="/about">
    <div className="logo-header ml2 pointer">
      <CigStatic />
    </div>
  </Link>
);

export default CigLogo;
