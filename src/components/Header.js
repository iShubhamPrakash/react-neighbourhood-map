import React from 'react';

// This component is for header at the top of the app
function Header() {

    return (
        <div className="header-container">
            <div className="menu-button">
                <img src={require('./Hamburger_icon.png')} alt="icon" id="menu-button"/>
            </div>
            <div className="header-text">
                <h1>Neighbourhood Map</h1>
            </div>
        </div>
        );
    }

export default Header;