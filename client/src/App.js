import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import EditorComp from './components/Editor/EditorComp';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='pa3 br3 shadow-5' style={{display: "flex", justifyContent: "flex-start"}}>
          <Navbar />
        </div>
      </header>
      <div className='pa5 tc'>
        <EditorComp />
      </div>
    </div>
  );
}

export default App;
