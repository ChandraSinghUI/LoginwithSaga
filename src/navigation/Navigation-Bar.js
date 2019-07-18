import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import{connect} from 'react-redux';
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';

import { loginRoute, searchRoute} from './route-constants';
import { loginSuccess } from '../store';


class NavigationBar extends Component {

  logout = () => {
    window.location.href = `/${loginRoute}`;
  }
  backSearch = () => {
    this.props.history.push(`/${searchRoute}`);
  }
  logooutBtn = () =>{
    console.log('LoginSuccess:'+ this.props.loginSuccess);
    if(this.props.loginSuccess.data!=null){
      return (<Nav className="pull-right">
      <NavItem onClick={this.logout}>Logout</NavItem>
    </Nav>);
    }else{
      return '';
    }
  }

  render() {
    return (
      <Navbar>
        {this.props.history.location.pathname === '/searchDetails' && ( <Nav>
          <NavItem onClick={this.backSearch} >Back</NavItem> 
        </Nav>)}
        <Nav>
          <NavItem style={{fontSize:'16px', textDecoration: 'none'}}>Star Wars</NavItem>
        </Nav>
      {this.logooutBtn()}
      </Navbar>
    );
  }
}
const mapStateToProps = (state) =>{
  return{
    loginSuccess:state.login
  }
 
}
export default compose(withRouter, connect(mapStateToProps))(NavigationBar);
