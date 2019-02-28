import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tree, Icon, Switch } from 'antd';
import { retreiveHierarchy } from './flux/treeActions';

const { TreeNode } = Tree;

class TreeDataContainer extends Component {
  
  state = {
      showChild:false
  }
  
  componentDidMount(){
    const { dispatch } = this.props;
    retreiveHierarchy(dispatch);
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }
  
  getTreeIconColor = (parent, child) => {
    let iconType = "file-ppt";
    let iconColor = "#52c41a";
    
    if(parent && child){
      iconType = "warning";
      iconColor = "#ccab00";
    } else if (child){
      iconType = "copyright";
//      iconColor = "#eb2f96";
      iconColor = "grey";
    }
    return { iconType, iconColor };
  }
  
  constructParentNode = (data) => {
    const { parent, child, fileName, childEntry } = data;
    
    const { iconType, iconColor} = this.getTreeIconColor(parent, child);
    
    return (
       <TreeNode icon={<Icon type={iconType} theme="twoTone" twoToneColor={iconColor}/>} 
         title={fileName} key={fileName}>
         {childEntry && Array.isArray(childEntry) && 
           this.constructChildNodes(childEntry)}
       </TreeNode>
    );
  }
  
  constructChildNodes = (childList) => {
    return (childList.map((data) => this.constructParentNode(data)));
  }
  
  render() {
    
    const { showChild } = this.state;
    const { hierarchy } = this.props;
    console.log(hierarchy);
    
    return (<div>
        {hierarchy && hierarchy.map((data, index) => 
          <Tree
            showIcon
            defaultExpandAll={showChild}
            onSelect={this.onSelect}
            onCheck={this.onCheck}
          >
            {this.constructParentNode(data)}
          </Tree>
    )}</div>);
  }
}

function mapStateToProps(state){
  return{
    hierarchy: state.get('tree').get('getTreeFormedData')
  }
}

export default withRouter(connect(mapStateToProps)(TreeDataContainer));