import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import '../../../styles/home.css';
import { MENU_CONSTANT as subMenuItems } from './menuConstant';

const { SubMenu } = Menu;
const { Sider } = Layout;

const styles={
    siderStyle:{
      background: '#fff',
      overflow: 'auto',
      height: '92vh'
    },
    menuStyle:{
      height: '100%',
      borderRight: 0 
    },
    subMenuIcon:{
      fontSize: 25 
    }
}

class SideMenu extends Component {
  
  constructor(props){
    super(props);
  }
  
  render() {
    const { history, collapsed } = this.props;
    const themeValue = "twoTone";

    return (
      <Sider
          width={200}
          collapsible
          trigger={null}
          collapsed={collapsed}
          style={styles.siderStyle}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={styles.menuStyle}
        >

        {subMenuItems.map(data => <SubMenu key= {data.name} title={<span>
        <Icon type={data.icon} theme={themeValue} style={styles.subMenuIcon} /><span>{data.name}</span></span>}>
        {
          data.nestedMenu.map( nestedValue => <Menu.Item key={nestedValue.name} onClick= {() => console.log(nestedValue.path)}>{nestedValue.name}</Menu.Item> )
        }
        </SubMenu>
        )}
        
        </Menu>
      </Sider>
    );
  }
}

function mapStatetoProps(state){
  return{
    collapsed: state.get('layout').get('switchSideToggle')
  }
}

export default withRouter(connect(mapStatetoProps)(SideMenu));