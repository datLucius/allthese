import React from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';

const App = props => (
  <div>
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default App;
