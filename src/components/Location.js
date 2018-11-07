import React from 'react';

// This component is for the list item in the Places list
function Location (props) {
  return (
    <li
      tabIndex='0'
      className='place'
      role='button'
      onClick={props.openInfoWindow.bind(this, props.placeData.marker)}
      onKeyPress={props.openInfoWindow.bind(this,props.placeData.marker)}
    >
      {props.placeData.longname}
    </li>
  )
}

export default Location;
