import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import EditorComp from './components/Editor/EditorComp';
import './App.css';
import Logo from './components/Logo/Logo';

const initialState = {
  text: '',
  route: 'signin',
  isSignedIn: false
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
        docs: data.docs,
        registered_on: data.registered_on
      }
    });
  }
  
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }
  
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <div
            className='pa1 br3'
            style={{
              display: "flex",
              justifyContent: "flex-start",
              borderRadius: "0"
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
}

export default App;
