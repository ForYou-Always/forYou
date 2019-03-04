import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tree as AntTree, Icon, Switch } from 'antd';
import { retreiveHierarchy } from './flux/treeActions';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import '../../styles/treeGraph.css'

const { TreeNode } = AntTree;

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
  
  constructTabStructures = (hierarchy) => {
    const tabRecords={};
    const singleDevForms=[], multiChildForms=[];

    hierarchy.map((record) => {
      const { child, parent, childEntry } = record;
      if(!child && parent && !childEntry){
        singleDevForms.push(record);
      }else {
        multiChildForms.push(record);
      }
    });

    return { singleDevForms, multiChildForms };
  }
  
  computeMultiChildSet = (multiChildForms) => {
  }
  
  constructMultichildTree = (childFormSet) => {
    childFormSet.forEach((record, index, thisArray) => {
      const { fileName, childEntry } = record;
      record['name'] = `${fileName}`;
      if(childEntry && childEntry.length > 0){
        record.childEntry = this.constructMultichildTree(childEntry);
      }
      record['children'] = childEntry;
      thisArray[index] = record;
    });
    return childFormSet;
  }
  
  sortTree = (first, second) => {
    const firsChild = first.childEntry ? first.childEntry:[];
    const secChild = second.childEntry? second.childEntry:[];
    if(firsChild.length > secChild.length) {
      return 1;
    } else {
      return -1;
    }
  }
  
  computeHeight = (d3Data) => {
    const { childEntry } = d3Data;
    let treeHeight = 0;
    if(childEntry) {
      treeHeight = childEntry.length;
      childEntry.forEach((childData) => {
        treeHeight = treeHeight + this.computeHeight(childData);
      });
    }
    return treeHeight;
  }
  
  render() {
    
    const { showChild } = this.state;
    const { hierarchy } = this.props;
    console.log(hierarchy);
    
    const { singleDevForms, multiChildForms } = hierarchy && this.constructTabStructures(hierarchy);
    
    const multiTree = multiChildForms && this.constructMultichildTree(multiChildForms);
    
    const sortedTree = multiTree && multiTree.sort(this.sortTree);
//    const sortedTree = multiTree;
    
    return (<div>
        {false && hierarchy && hierarchy.map((data, index) => 
          <AntTree
            showIcon
            defaultExpandAll={showChild}
            onSelect={this.onSelect}
            onCheck={this.onCheck}
          >
            {this.constructParentNode(data)}
          </AntTree>
    )}
        <div className="custom-container">    
          {sortedTree && sortedTree.map((d3Data, index) => 
              <Tree
                data={d3Data}
                height={this.computeHeight(d3Data) * 75}
                width={500}
                animated
                svgProps={{
                  className: 'custom'
                }}/>
          )}
        </div>
        </div>);
  }
}

function mapStateToProps(state){
  return{
    hierarchy: state.get('tree').get('getTreeFormedData')
  }
}

export default withRouter(connect(mapStateToProps)(TreeDataContainer));