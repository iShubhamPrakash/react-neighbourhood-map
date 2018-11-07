import React, { Component } from 'react';
import '../App.css';
import Header from "./Header"
import SideBar from "./SideBar"

class App extends Component {

  state = {

  }

  componentDidMount() {
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadMapScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBI20h8IjJ3gP82J6MTxEJMlwY4K7nsFak&callback=initMap"
    );
  }

  initMap = () => {
    // Default values when the map loads for the first time
    let defaultLatitude = 25.607794;
    let defaultLongitude = 85.137722;
    let defaultZoom = 16;
    let mapContainer = document.getElementById("map");
    // set full height for the map
    mapContainer.style.height = window.innerHeight - 66 + "px";

    let self = this;

    let map = new window.google.maps.Map(mapContainer, {
      center: { lat: defaultLatitude, lng: defaultLongitude },
      zoom: defaultZoom,
      mapTypeControl: false
    });

  }

  render(){
    return (
      <div className="main-app">
        <Header />
        <SideBar/>

      <div id="map" />
    </div>
    );
  }
}

export default App;


// To add script to load google map

function loadMapScript(src) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.async = true;
  script.src = src;
  script.onerror = function() {
    document.write("Error: Google Maps can't be loaded");
  };
  ref.parentNode.insertBefore(script, ref);
}