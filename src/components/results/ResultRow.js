import { connect } from 'react-redux';
import React, { Component } from 'react';
import moment from 'moment';

import { toggleResult } from '../../actions';

class ResultRow extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleResult(this.props.myResult.session_id);
  }

  render() {
    return (
      <div className="w-100 flex">
        <div className="w-20 b--white bw1 ba tc flex flex-column justify-center br-0 f6">{this.props.myResult.session_id || 'NA'}</div>
        <div className="w-10 b--white bw1 ba tc flex flex-column justify-center br-0 f6">{this.props.myResult.subject_id || 'NA'}</div>
        <div className="w-10 b--white bw1 ba tc flex flex-column justify-center br-0 f6">{moment(this.props.myResult.created_at).format('MM/DD/YYYY') || 'NA'}</div>
        <div className="w-20 b--white bw1 ba tc flex flex-column justify-center br-0 f6">{moment(this.props.myResult.created_at).format('HH:mm:ss') || 'NA'}</div>
        <div className="w-10 b--white bw1 ba tc flex flex-column justify-center br-0 f6">{this.props.myResult.device_address || 'NA'}</div>
        <div className="w-20 b--white bw1 ba tc flex flex-column justify-center br-0 f6">{this.props.myResult.device_description}</div>
        <div className="w-10 b--white bw1 ba tc flex flex-column justify-center">
          <input type="checkbox" name={this.props.myResult.session_id} className="center pointer" onClick={() => { this.handleClick(); }} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.queryReducer.results
  };
}

export default connect(mapStateToProps, { toggleResult })(ResultRow);
