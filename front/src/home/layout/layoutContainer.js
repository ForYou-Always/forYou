import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Button, Tooltip } from 'antd';
import Header from './components/header';
import SideMenu from './components/sideMenu';
import ContentBody from './components/contentBody';

class LayoutContainer extends Component {

  constructor(props){
    super(props);
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