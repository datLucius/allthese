import { connect } from 'react-redux';
import React, { Component } from 'react';
import moment from 'moment';
import _ from 'underscore';

import { getSessionsByParams } from '../../actions';
import CenterCard from '../shared/CenterCard';
import Card from '../shared/Card';
import Loader from '../shared/Loader';

import ResultRow from './ResultRow';

class ResultsView extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getSessionsByParams(this.props.params);
  }

  handleClick() {
    const csvResults = [];
    _.forEach(this.props.sessionArray, (session) => {
      _.forEach(this.props.sessions, (result) => {
        if (result.session_id === session) {
          csvResults.push(result);
        }
      });
    });
    const data = csvResults.map((session) => {
      const rObj = [`sessionID: ${session.session_id}`, `subjectID: ${session.subject_id}`, `created_at: ${moment(session.created_at).format('MM/DD/YYYY')}`, `sessionTime: ${moment(session.sessionTime).format('MM/DD/YYYY')}`, `device_address: ${session.device_adress}`, `device_description: ${session.device_description}`];
      return rObj;
    });
    let csvContent = "data:text/csv;charset=utf-8,";
    data.forEach((infoArray, index) => {
      const dataString = infoArray.join(", ");
      csvContent += index < data.length ? `${dataString}\n` : dataString;
    });
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  render() {
    const { sessions, loading } = this.props;
    return (
      <div>
        {loading ?
          <Loader /> :
          <div>
            <CenterCard>
              <div className="tc f3">
                Requested Information Is Listed Below
              </div>
              <div className="mt4">
                <div className="header-row w-100 flex">
                  <div className="w-20 bg-zer-light-blue white b--white bw1 ba tc flex flex-column justify-center br-0">Session Id</div>
                  <div className="w-10 bg-zer-light-blue white b--white bw1 ba tc flex flex-column justify-center br-0">Subject Id</div>
                  <div className="w-10 bg-zer-light-blue white b--white bw1 ba tc flex flex-column justify-center br-0">Session Date</div>
                  <div className="w-20 bg-zer-light-blue white b--white bw1 ba tc flex flex-column justify-center br-0">Session Time</div>
                  <div className="w-10 bg-zer-light-blue white b--white bw1 ba tc flex flex-column justify-center br-0">Device Address</div>
                  <div className="w-20 bg-zer-light-blue white b--white bw1 ba tc flex flex-column justify-center br-0">Device Description</div>
                  <div className="w-10 bg-zer-light-blue white b--white bw1 ba tc flex flex-column justify-center">Select Session</div>
                </div>
                <div>
                  {sessions && sessions.map(result => (
                    <div className="header-row" key={result.subject_id}>
                      <ResultRow myResult={result} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="tc mt4 f4">
                Select the Specific Session To Be Exported To .CSV File For Analysis And Click Below
              </div>
            </CenterCard>
            <Card>
              <div className="w-100 pa2 flex">
                <div className="ml-auto">
                  <div className="pa2 pl4 pr4 bg-zer-green br2 white dib bn f5 pointer button-shadow" onClick={() => { this.handleClick(); }} role="button">Export to CSV</div>
                </div>
              </div>
            </Card>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sessions: state.queryReducer.sessions,
    sessionArray: state.queryReducer.sessionArray,
    loading: state.queryReducer.loading
  };
}
export default connect(mapStateToProps, {
  getSessionsByParams
})(ResultsView);
