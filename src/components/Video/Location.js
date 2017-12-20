import React from 'react';

const Location = (props) => {
  const { country, extra } = props.location;
  return (
    <div className="location dib">
      <div className="h1 w-100 puff-hover" />
      <div className="bg-black white pa2 pb0 relative">
        <div className="pa2">{country}</div>
        <div className="bg-white black">
          {extra.map(data => <div className="pa2">{data}</div>)}
        </div>
      </div>
    </div>
  );
};

export default Location;
