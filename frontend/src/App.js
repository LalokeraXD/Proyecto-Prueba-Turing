import React from 'react';
import './App.css';
import {Header, Hero, Articles, Cta, Quotes, Footer} from './containers'

const App = () => {

  return (
    <div className="App">
      <Header/>
      <Hero/>
      <Articles/>
      <Cta/>
      <Quotes/>
      <Footer/>
    </div>
  );
};

export default App;
