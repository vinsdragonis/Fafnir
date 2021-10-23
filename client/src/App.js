import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='center'>
          <div className='form center pa4 br3 shadow-5' style={{display: "flex", justifyContent: "flex-center"}}>
            <Navbar />
            <input className='f4 pa2 w-70 center' type="tex" />
            <button
              className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
              >
              Click me!
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
