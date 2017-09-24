import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import React, { Component } from 'react';
import ZerInput from '../shared/ZerInput';

import { signinUser } from '../../actions';
import renderAlert from '../shared/renderAlert';
import Button from '../shared/ZerButton';
import Card from '../shared/Card';
import WhiteCard from '../shared/WhiteCard';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({ username, password }) {
    this.props.signinUser(username, password);
  }

  render() {
    const { handleSubmit, errorMessage } = this.props;
    return (
      <div>
        <WhiteCard>
          <div className="tc black mb4 f2 mt2">Sign In.</div>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <ZerInput
              name="username"
              type="text"
              label="email address"
            />
            <ZerInput
              name="password"
              type="password"
              label="password"
            />
            {renderAlert(errorMessage)}
            <Card>
              <div className="w-100 pa2 flex">
                <div className="ml-auto">
                  <Button action="submit">Sign in</Button>
                </div>
              </div>
            </Card>
          </form>
          <div className="mt4 db">
            <Card>
              <Link to="/signup" className="black">Create an account here.</Link>
            </Card>
            <Card>
              <Link to="/forgot" className="black">Forgot your password?</Link>
            </Card>
          </div>
        </WhiteCard>
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

function mapStateToProps(state) {
  return { form: state.form, errorMessage: state.authReducer.error };
}

export default reduxForm({
  form: 'signin',
  validate
})(connect(mapStateToProps, { signinUser })(Signin));
