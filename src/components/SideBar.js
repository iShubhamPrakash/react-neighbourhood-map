import React from 'react';
import LocationList from "./LocationList";
import PropTypes from 'prop-types';

// This component is for sidebar on left of the app
function SideBar(props){

        return (
            <div className="side-bar">
                <LocationList
                locationData={props.locationData}
                openInfoWindow={props.openInfoWindow}
                closeInfoWindow={props.closeInfoWindow}
                />
            </div>
            );
}


SideBar.propTypes = {
    openInfoWindow: PropTypes.func,
    closeInfoWindow: PropTypes.func,
    locationData: PropTypes.array
};


export default SideBar;