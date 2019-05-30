import React from '../../../../node_modules/react';

import "./SubmitButton.css";

 const SubmitButton =(props)=>{
    return(
        <button className="SubmitButton">{props.title}</button>
    );
}

export default SubmitButton;