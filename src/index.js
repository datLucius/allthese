import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

import App from './components/app';
import Video from './components/Video/VideoView';
import Gallery from './components/Gallery/GalleryView';
import About from './components/About/AboutView';

const createStoreWithMiddleware = applyMiddleware(
  reduxThunk
)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/" component={App}>
        <IndexRoute component={Video} />
        <Route path="gallery" component={Gallery} />
        <Route path="about" component={About} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
