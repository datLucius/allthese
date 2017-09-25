import { connect } from 'react-redux';
import React, { Component } from 'react';
import { toggleResult } from '../../actions';
import moment from 'moment';

class ResultRow extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleResult(this.props.myResult.id);
  }

  render() {
    return (
      <div className="header-row w-100 flex">
        <div className="w-20 b--white bw1 ba tc flex flex-column justify-center br-0 f6">{this.props.myResult.sessionId || 'NA'}</div>
        <div className="w-10 b--white bw1 ba tc flex flex-column justify-center br-0 f6">{this.props.myResult.subjectId || 'NA'}</div>
        <div className="w-10 b--white bw1 ba tc flex flex-column justify-center br-0 f6">{moment(this.props.myResult.sessionDate).format('MM/DD/YYYY') || 'NA'}</div>
        <div className="w-20 b--white bw1 ba tc flex flex-column justify-center br-0 f6">{moment(this.props.myResult.sessionTime).format('HH:mm:ss') || 'NA'}</div>
        <div className="w-10 b--white bw1 ba tc flex flex-column justify-center br-0 f6">{this.props.myResult.deviceId || 'NA'}</div>
        <div className="w-20 b--white bw1 ba tc flex flex-column justify-center br-0 f6">{this.props.myResult.sensorData}</div>
        <div className="w-10 b--white bw1 ba tc flex flex-column justify-center">
          <input type="checkbox" name={this.props.myResult.sessionId} className="center pointer" />
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
