import React from 'react';
import PropTypes from 'prop-types';
import "./DrawerToggleButton.css";

const DrawerToggleButton=(props)=>{
    return(
        <button className="toggle-button" onClick={props.click}>
            <div className="toggle-button__line"></div>
            <div className="toggle-button__line"></div>
            <div className="toggle-button__line"></div>
        </button>
    )
}

DrawerToggleButton.propTypes={
    click:PropTypes.func
}

export default DrawerToggleButton; 