import React from 'react';
import {Link} from 'react-router-dom';
import './SideDrawer.css';
const SideDrawer =(props)=>{
    let drawerClasses = 'side-drawer';

    if(props.show){
        drawerClasses='side-drawer open';
    }
    return(
        <nav className={drawerClasses}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li>{props.auth ? <a href="/api/logout">Logout</a>: <a href="/auth/google">Login With Google</a>}</li>
                <li><Link to="/results">Results</Link></li>
            </ul>
        </nav>
    )

}

export default SideDrawer;