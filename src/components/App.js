import React, { Component } from 'react';
import '../App.css';
import Header from "./Header"

class App extends Component {
  render() {
    return (
      <div className="main-app">
        <Header/>
      <h1>Hello World!</h1>
    </div>
    );
  }
}

export default App;
