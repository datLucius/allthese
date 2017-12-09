import React from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import CigLogo from './shared/CigLogo';

const App = props => (
  <div>
    <Header />
    <CigLogo />
    {props.children}
    <Footer />
  </div>
);

export default App;
