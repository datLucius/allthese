import { connect } from 'react-redux';
import React from 'react';

import CenterCard from '../shared/CenterCard';
import Card from '../shared/Card';
import ZerButton from '../shared/ZerButton';

import ResultRow from './ResultRow';

const ResultsView = ({ results }) => (
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
          <div className="w-10 bg-zer-light-blue white b--white bw1 ba tc flex flex-column justify-center br-0">Device Id</div>
          <div className="w-20 bg-zer-light-blue white b--white bw1 ba tc flex flex-column justify-center br-0">Sensor Data</div>
          <div className="w-10 bg-zer-light-blue white b--white bw1 ba tc flex flex-column justify-center">Select Session</div>
        </div>
        <div>
          {results.map(result => (
            <div>
              <ResultRow myResult={result} key={result.id} />
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
          <ZerButton action="submit">Export to CSV</ZerButton>
        </div>
      </div>
    </Card>
  </div>
);

function mapStateToProps(state) {
  return {
    results: state.queryReducer.results
  };
}
export default connect(mapStateToProps)(ResultsView);
