import React from 'react';
import LocationList from "./LocationList";

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

export default SideBar;