import React from 'react';
import { connect } from 'react-redux';

const Footer = props => (
  <div className="fixed bottom-0 w-100 bg-white">
    <div className="mb3 white tc  pt2 pb2 f6" style={{ backgroundColor: props.color }}><a href="mailto:jlnelsonart@gmail.com" className="footer-link link pointer white">Lucius</a> did the art;<a href="https://github.com/jksimoniii" className="footer-link link pointer white"> Jim</a> wrote the database</div>
  </div>
);

function mapStateToProps(state) {
  return {
    color: state.cigs.color
  };
}

export default connect(mapStateToProps)(Footer);
