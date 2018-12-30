import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Button, Tooltip } from 'antd';
import '../../../styles/home.css';

import * as ACTION_TYPES from '../flux/layoutActionTypes';

const { Header } = Layout;

const logoImage = "./front/src/styles/images/ForYou.jpg";

class HeaderContainer extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        collapsed: false,
    }
  }
  
  componentWillMount(){
    const { dispatch } = this.props;
    dispatch({
      type: ACTION_TYPES.RECEIVE_MENU_TOGGLE,
      data: false,
    });
  }
  
  handleSideMenuToggle = () => {
    const { dispatch } = this.props;
    const collapsed = !this.state.collapsed;
    
    dispatch({
      type: ACTION_TYPES.RECEIVE_MENU_TOGGLE,
      data: collapsed,
    });
    this.setState({ collapsed });
  }

  render() {
    const { history } = this.props;

    return (
      <Header className="header" style={{ padding:'0 30px' }}>
        <Button shape="circle" icon="menu-fold" onClick={this.handleSideMenuToggle} style={{ marginRight:10 }}/>          
        <span>
          <img src={logoImage} height="35" width="100"/>
          <div style={{ float:'right' }}>
            <Button type="dashed" icon="notification" style={{ marginRight:10 }}/>
            <Button type="dashed" icon="message" style={{ marginRight:10 }}/>
            <Button type="dashed" icon="bars" style={{ marginRight:10 }}/>
            <Tooltip placement="bottomRight" title="Logout">
              <Button type="dashed" icon="logout"/>
            </Tooltip>
          </div>
        </span>
      </Header>
    );
  }
}

export default connect(null)(withRouter(HeaderContainer));