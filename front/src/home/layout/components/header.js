import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Button, Tooltip, Spin } from 'antd';
import { logOutUser } from '../flux/layoutActions';
import * as ACTION_TYPES from '../flux/layoutActionTypes';
import '../../../styles/home.css';

import { socket } from '../../../common/notifications/socketClient';

const { Header } = Layout;

const loginRedirect = "door.html#/login";
const logoImage = "./front/src/styles/images/ForYou.jpg";


class HeaderContainer extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        loading: false,
        collapsed: false,
    }
  }
  
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: ACTION_TYPES.RECEIVE_MENU_TOGGLE,
      data: false
    });
    dispatch({
      type: ACTION_TYPES.RECEIVE_POST_DRAWER_TOGGLE,
      data: false
    });
  }
  
  handleLogout = async () => {
    const { dispatch } = this.props;
    this.setState({ loading:true });
    await logOutUser(dispatch);
    window.location.href = `${window.location.origin}/${loginRedirect}`;
    this.setState({ loading:false });
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
  
  handlePostDrawerToggle=()=>{

    const { dispatch } = this.props;
//    const drawer = !this.state.drawer;
    
    dispatch({
      type: ACTION_TYPES.RECEIVE_POST_DRAWER_TOGGLE,
      data: true,
    });
//    this.setState({ drawer });
  }
  
  render() {
    const { history } = this.props;
    const { loading } = this.state;

    return (<Spin tip="Logging in..." spinning={this.state.loading} >
      <Header className="header" style={{ padding:'0 30px' }}>
        <Button shape="circle" icon="menu-fold" onClick={this.handleSideMenuToggle} style={{ marginRight:10 }}/>          
        <span>
          <img src={logoImage} height="35" width="100"/>
          <div style={{ float:'right' }}>
            <Button type="dashed" icon="environment" style={{ marginRight:10 }} onClick= {() => history.push('/location/mine')} /> 
            <Button type="dashed" icon="notification" style={{ marginRight:10 }} onClick={() => socket.emit('serverTrigger', 'Sent an event from the client!')} />
            <Button type="dashed" icon="plus-square" style={{ marginRight:10 }} onClick={this.handlePostDrawerToggle}/>
            <Button type="dashed" icon="message" style={{ marginRight:10 }} />
            <Button type="dashed" icon="bars" style={{ marginRight:10 }} />
            <Tooltip placement="bottomRight" title="Logout">
              <Button type="dashed" icon="logout" onClick={this.handleLogout} />
            </Tooltip>
          </div>
        </span>
      </Header></Spin>
    );
  }
}

export default withRouter(connect(null)(HeaderContainer));