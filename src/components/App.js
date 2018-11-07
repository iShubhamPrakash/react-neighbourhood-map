import React, { Component } from 'react';
import '../App.css';
import Header from "./Header"
import SideBar from "./SideBar"

class App extends Component {

  state = {
    map: "",
    locationData: require("./LocationData.json"), // Get the locations from the JSON file
    infowindow: "",
    oldMarker: ""
  }

  componentDidMount() {
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    addMapScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBI20h8IjJ3gP82J6MTxEJMlwY4K7nsFak&callback=initMap"
    );
  }

  initMap = () => {
    // Default values when the map loads for the first time
    let defaultLatitude = 25.607794;
    let defaultLongitude = 85.137722;
    let defaultZoom = 16;

    let mapContainer = document.getElementById("map");

    // set full height for the map (-66px to remove space tacken by header)
    mapContainer.style.height = window.innerHeight - 66 + "px";

    // Creating map instance
    let map = new window.google.maps.Map(mapContainer, {
      center: { lat: defaultLatitude, lng: defaultLongitude },
      zoom: defaultZoom,
      mapTypeControl: false
    });

    let self = this;
    // To center the map when windows is resized
    window.google.maps.event.addDomListener(window, "resize", function() {
      window.google.maps.event.trigger(map, "resize");
      self.state.map.setCenter(map.getCenter());
    });

    // Add information window
    let InfoWindow = new window.google.maps.InfoWindow({});


    // Close information window if open
    window.google.maps.event.addListener(InfoWindow, "closeclick", function() {
      self.closeInfoWindow();
    });

    // Close information window when clicked elsewhere on the map
    window.google.maps.event.addListener(map, "click", function() {
      self.closeInfoWindow();
    });

    // Set state for the map
    this.setState({
      map: map,
      infowindow: InfoWindow
    });

    let locationsList = [];
    this.state.locationData.forEach(function(locationInfo) {
      let longname = locationInfo.name + " - " + locationInfo.type;

      // Creating new marker instance
      let marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          locationInfo.lat,
          locationInfo.lng
        ),
        animation: window.google.maps.Animation.DROP,
        map: map
      });

      marker.addListener("click", function() {
        self.openInfoWindow(marker);
      });

      locationInfo.longname = longname;
      locationInfo.marker = marker;
      locationInfo.display = true;
      // Add locationInfo to the locationList Array
      locationsList.push(locationInfo);
    });

    // Add location of places to the state
    this.setState({
      locationData: locationsList
    });
}

// Function to close the info window previously opened
closeInfoWindow = () => {
  if (this.state.oldMarker) {
    this.state.oldMarker.setAnimation(null);
  }
  this.setState({
    oldMarker: ""
  });
  this.state.infowindow.close();
}

openInfoWindow = (marker) => {
  this.closeInfoWindow();
  this.state.infowindow.open(this.state.map, marker);

  // Adding bounce animation to the marker
  marker.setAnimation(window.google.maps.Animation.BOUNCE);

  this.setState({ oldMarker: marker });

  this.state.infowindow.setContent("Loading...");
  this.state.map.setCenter(marker.getPosition());
  this.state.map.panBy(0, -200);
  this.getMarkerInfo(marker);
}

getMarkerInfo = (marker) => {
// Add the api keys for foursquare
let clientId = "WX30CRJI0VEZH2DQPFWMW0FLXYWHUHPRXZ5QXDUPOREJB1NR";
let clientSecret = "LRDHGQ41KFZTQNQTAHEGGW3RSMSDMDPZP0DE5Y1Y3HK1BED1";

// Add API key info in the url
let url = `https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20130815&ll=${marker.getPosition().lat()},${marker.getPosition().lng()}&limit=1`

fetch(url)
  .then((resp) => {
    if (resp.status !== 200) {
      this.state.infowindow.setContent("Sorry data can't be loaded");
      return;
    }

    // Get the text in the response
    resp.json().then((data) => {
      // Set place info in infoWindow
      let placeInfo = data.response.venues[0];
      let placeName = `<h3>${placeInfo.name}</h3>`;
      let address = `<p>${placeInfo.location.formattedAddress[0]}</p>`;
      let checkinsCount =`<b>CheckIns:</b> ${placeInfo.stats.checkinsCount}<br>`;
      let reviewsLink =`<a href="https://foursquare.com/v/${placeInfo.id}" target="_blank">See reviews on <b>Foursquare</b></a>`;

      // Add the above information into the state
      this.state.infowindow.setContent(
        placeName + address + checkinsCount + reviewsLink
      );

    });
  })
  .catch((err) => {
    this.state.infowindow.setContent(`Sorry data can't be loaded, Error: ${err}`);
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

// To add script to load google map on the page
function addMapScript(src) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.async = true;
  script.src = src;
  script.onerror = function() {
    document.write("Error: Google Maps can't be loaded");
  };
  ref.parentNode.insertBefore(script, ref);
}



export default App;
