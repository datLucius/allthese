import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

import App from './components/app';
import Home from './components/home';
import Signin from './components/auth/Signin';
import Search from './components/search/SearchView';
import Results from './components/results/ResultsView';

const createStoreWithMiddleware = applyMiddleware(
  reduxThunk
)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Signin} />
        <Route path="search" component={Search} />
        <Route path="results" component={Results} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
