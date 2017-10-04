import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkForUser } from '../../actions';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.checkForUser().then((user) => {
          if (!user) {
            this.context.router.push('/');
          }
        });
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authentication.contextTypes = {
    router: React.PropTypes.object
  };

  function mapStateToProps(state) {
    return { authenticated: state.authReducer.authenticated };
  }

  return connect(mapStateToProps, {
    checkForUser
  })(Authentication);
}
