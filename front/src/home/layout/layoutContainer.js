import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Button, Tooltip } from 'antd';
import Header from './components/header';
import SideMenu from './components/sideMenu';
import ContentBody from './components/contentBody';
import io from 'socket.io-client';

class LayoutContainer extends Component {
  
  constructor(props){
    super(props);
  }
  
  componentDidMount_(){
    const socket = io.connect(window.location.origin);
    console.log('check 1', socket.connected);
    socket.on('connect', function() {
      console.log('check 2', socket.connected);
    });
    
    socket.on('disconnect', function(){
      console.log('disconnected', socket.connected);
    });
  }
	
	render() {
		const { history, children } = this.props;

		return (
			<Layout>
  	    <Header />
  	    <Layout>
  	      <SideMenu />
  	      <ContentBody>
  	        {children}
  	      </ContentBody>
  	    </Layout>
  	  </Layout>
	  );
	}
}

export default withRouter(connect(null)(LayoutContainer));