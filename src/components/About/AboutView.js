import { connect } from 'react-redux';
import React from 'react';
import { updateColor } from '../../actions';


const AboutView = () => (
  <div>
    <div className="mt5 pa4 mw6 center z-1">
      <div className="f3 playfair mb2">Next time you walk down the street,</div>
      <div className="f3 playfair mb4">keep an eye out for abandoned cigarette packs.</div>
      <div className="f3 playfair mb4">They&rsquo;re everywhere.</div>
      <div className="f3 playfair mb4">Having one last hurrah,</div>
      <div className="f3 playfair mb4 ml4">dancing towards complete annihilation.</div>
      <div className="f3 playfair mb5">So particularly crumpled, crushed, run-over, torn, baked in the sun, sweating with the humidity, turned to mush in the rain, frozen in ice, buried by the city</div>
      <div className="f3 playfair mb4">Have you ever seen one like that?</div>
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    color: state.cigs.color
  };
}

export default connect(mapStateToProps, { updateColor })(AboutView);
