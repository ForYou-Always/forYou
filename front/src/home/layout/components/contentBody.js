import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Breadcrumb , Card, Icon, Avatar} from 'antd';

const { Content } = Layout;
const { Meta } = Card;

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
          <Card
            style={{ width: 300 }}
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={JSON.stringify(postResponse)}
              description="This is the description"
            />
          </Card>
          <Content style={styles.body} >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStatetoProps(state){
  return{
    postResponse: state.get('post').get('getPostData')
  }
}

export default withRouter(connect(mapStatetoProps)(ContentBody));