import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

import App from './components/app';
import Signin from './components/auth/Signin';
import Search from './components/search/SearchView';
import Results from './components/results/ResultsView';
import RequireAuth from './components/auth/RequireAuth';

const createStoreWithMiddleware = applyMiddleware(
  reduxThunk
)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Signin} />
        <Route path="search" component={RequireAuth(Search)} />
        <Route path="results/:subject_id/:date" component={RequireAuth(Results)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
