import { connect } from 'react-redux';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { queryDB } from '../../actions';

import CenterCard from '../shared/CenterCard';
import WhiteCard from '../shared/WhiteCard';
import HalfGrid from '../shared/HalfGrid';
import ZerInput from '../shared/ZerInput';
import Card from '../shared/Card';
import ZerButton from '../shared/ZerButton';

class SearchView extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({ id, date }) {
    this.props.signinUser(id, date);
  }

  render() {
    const { handleSubmit, errorMessage } = this.props;
    return (
      <div>
        <CenterCard>
          <div className="tc f3">
            Provide Subject ID and/or Session Date To Retrieve Requested Session Data
          </div>
          <WhiteCard>
            <div className="flex">
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <HalfGrid>
                  <ZerInput
                    name="id"
                    type="text"
                    label="Subject ID"
                  />
                </HalfGrid>
                <HalfGrid>
                  <ZerInput
                    name="date"
                    type="text"
                    label="Session Date"
                  />
                </HalfGrid>
                <Card>
                  <div className="w-100 pa2 flex">
                    <div className="ml-auto">
                      <ZerButton action="submit">Search</ZerButton>
                    </div>
                  </div>
                </Card>
              </form>
            </div>
          </WhiteCard>
        </CenterCard>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = '*required';
  }
  if (!values.password) {
    errors.password = '*required';
  }

  return errors;
}

export default reduxForm({
  form: 'query',
  validate
})(connect(null, { queryDB })(SearchView));
