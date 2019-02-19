import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Breadcrumb, Icon } from 'antd';

const { Content } = Layout;

const styles = {
    layout:{
      padding: '0 24px 24px'
    },
    body:{
      background: '#fff',
      padding: 24,
      margin: 0,
      minHeight: 280
    }
}

class ContentBody extends Component {
  
  constructor(props){
    super(props);
  }
  
  render() {
    const { history, children } = this.props;
    
    return (
      <Layout>
        <Layout style={styles.layout}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={styles.body} >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect(null)(ContentBody));