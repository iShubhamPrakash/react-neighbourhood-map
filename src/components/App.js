import React, { Component } from 'react';
import '../App.css';
import Header from "./Header"
import SideBar from "./SideBar"

class App extends Component {
  render() {
    return (
      <div className="main-app">
        <Header />
        <SideBar/>

      <h1>Hello World!</h1>
    </div>
    );
  }
}

export default App;
