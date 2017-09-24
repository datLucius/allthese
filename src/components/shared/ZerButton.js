import React from "react";

const ZerButton = ({ action, children }) => (
  <button
    action={action}
    className="pa2 pl4 pr4 bg-quad-green br2 white dib bn f5 pointer quad-shadow"
  >
    {children}
  </button>
);

export default ZerButton;
