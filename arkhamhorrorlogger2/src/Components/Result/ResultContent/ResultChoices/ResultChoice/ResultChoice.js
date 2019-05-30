import React from '../../../../../../node_modules/react';

const ResultChoice=(props)=>{
    return(
        <li style={props.style}>{props.result} {props.percent}</li>
    )
}


export default ResultChoice;