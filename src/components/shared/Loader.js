import React from 'react';

const Loader = () => (
  <div className="w-100 h-100 fixed top-0 left-0 fn bg-black-50">
    <div className="spinner center">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  </div>
);

export default Loader;
