import React from 'react';
import DesktopMenuTitle from './DesktopMenuTitle';

import pages from './pages';

const DesktopMenu = ({ color }) => (
  <div className="pointer">
    {pages.map(({ name, description, to }) =>
      <DesktopMenuTitle name={name} description={description} to={to} key={name} color={color} />
    )}
  </div>
);

export default DesktopMenu;
