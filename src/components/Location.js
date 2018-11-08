import React from 'react';

// This component is for the list item in the Places list
function Location (props) {
  return (
    <div>
    <li
      tabIndex='0'
      className='place'
      role='button'
      onClick={props.openInfoWindow.bind(this, props.placeData.marker)}
      onKeyPress={props.openInfoWindow.bind(this,props.placeData.marker)}
      >
        <img src={require('./place.png')} alt="icon" id="place-icon" />
      {props.placeData.longname}
    </li>
    </div>

  )
}

export default Location;
