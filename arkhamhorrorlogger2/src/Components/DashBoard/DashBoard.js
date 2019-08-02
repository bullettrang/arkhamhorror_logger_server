import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link} from "react-router-dom";
import {connect} from 'react-redux';
import FilesMenu from './FilesMenu/FilesMenu';

import * as actions from '../../actions/index';
import "./DashBoard.css"





class Dashboard extends Component{
    static get propTypes() { 
        return { 
            auth: PropTypes.any
        }; 
    }

    renderContent(){
        switch(this.props.auth){
            case null:
                return ;
            case false:
                return (
                    <div>NOT LOGGED IN</div>
                )
            default: 
                return (
                    <React.Fragment>
                        <FilesMenu/>
                        <div className="Campaign_Link--wrapper">
                            <Link className="Campaign_Link" to="/campaign"> 
                                <span className="Campaign_Wrapper"><span>+</span> CREATE A CAMPAIGN</span>
                            </Link>
                        </div>
                    </React.Fragment>
                );     
        }
    }

    render(){
        return(
            <div className="DashBoard_Wrapper">
              {this.renderContent()}
              {/* <SlideShow/> */}
            </div>
          );
    }

  }

  const mapStateToProps = ({auth}) => {
    return {
      auth
    }
  }
  
  export default connect(mapStateToProps,actions)(Dashboard);
  