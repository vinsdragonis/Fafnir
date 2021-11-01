import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import EditorComp from './components/Editor/EditorComp';
import './App.css';
import Logo from './components/Logo/Logo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div
          className='pa1 br3'
          style={{
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: "black",
            borderRadius: "0",
            paddingTop: "10px"
          }}
        >
          <Logo />
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
