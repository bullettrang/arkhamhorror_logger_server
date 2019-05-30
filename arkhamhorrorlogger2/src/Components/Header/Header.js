import React,{Component} from '../../../node_modules/react';
import {connect} from '../../../node_modules/react-redux/lib';
import classnames from "../../../node_modules/classnames";
import EldersignSvg from '../DashBoard/SVGs/EldersignSvg';
import DrawerToggleButton from './DrawerToggleButton';
import './Header.css';

class Header extends Component{

    constructor(props) {
        super(props);

      }


    render(){
        const {styleheader}=this.props;
   
        return(
            <div         
                className="Header__wrapper" style={styleheader} >
                    <div className="Header__toggle--button">
                        <DrawerToggleButton click={this.props.drawerClickHandler}/>
                    </div>

                <div className="Header__content">

                        <div className="Header__wrapper--title">
                            <div className="Header__content--logo">
                                <EldersignSvg width={'75px'} height={'75px'} stroke={"#979797"}/>
                            </div>
                            <h1 className="Header--title"> <span className="title-1">ARKHAM</span> <span className="title-2">HORROR</span> <span className="title-3">LOGGER</span> </h1>
                        </div>
                </div>
            </div>  
        );
    }
}

const mapStateToProps=({auth})=>{
    return{
        auth
    }
}

export default connect(mapStateToProps,null)(Header);