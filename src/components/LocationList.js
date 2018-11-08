import React, { Component } from 'react';
import Location from './Location';

class LocationList extends Component {
  state = {
    locations: '',
    searchQuery: ''
  }

  componentWillMount() {
    this.setState({
      locations: this.props.locationData
    })
  }

  filterLocations = (e) => {
    // Close any open info window
      this.props.closeInfoWindow();
      const { value } = e.target;
      let locations = [];

      // Make marker visible as per the query
      this.props.locationData.forEach(place => {

        if (place.longname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          place.marker.setVisible(true);
            locations.push(place);
        } else {
          place.marker.setVisible(false);
        }

    })

    // Update the state
    this.setState({
      locations: locations,
      searchQuery: value
    })

  }

  render () {

    let locationlist = this.state.locations.map(function (location, index) {
      return (
        <Location
          key={index}
          placeData={location}
          openInfoWindow={this.props.openInfoWindow.bind(this)}
        />
      )
    }, this)

    return (
      <div className='filter-area'>
        <h3 className="filter-title">Filter Location</h3>
        <input
          id='search-box'
          role='search'
          aria-labelledby='search-field'
          type='text'
          placeholder='Filter Locations'
          value={this.state.searchQuery}
          onChange={this.filterLocations}
        />
        <ul className='location-list'>
          {locationlist}
        </ul>
      </div>
    )
  }
}

export default LocationList;
