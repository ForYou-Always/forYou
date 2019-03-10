import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Button, Spin, Tag } from 'antd';
import { getVersionControlData } from './flux/treeActions';


class VersionControlContainer extends Component {

  state = {
      loading:false
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    this.setState({ loading: true });
    await getVersionControlData(dispatch);
    this.setState({ loading: false });
  }
  
  viewNestedTable = (record) => {
    
    const nestedTablecolumns =[{
      title:"Module Name",
      dataIndex: "moduleName",
      key: "moduleName"
    }, {
      title:"Last Synced On",
      dataIndex: "lastSyncStartTime",
      key: "lastSyncStartTime"
    }, {
      title:"Elapsed Time",
      render: (text, row) => <Tag>{row.lastSyncEndTime - row.lastSyncStartTime}</Tag>
    }, {
      title:"Start Sync",
      render: (text, row) => <Button icon={"play-circle"}/>
    }];
    
    return (
        <Table 
          columns={nestedTablecolumns}
          dataSource={record.nestedData}
          size="small"
        />
    );
  }

  render() {
    const { loading } = this.state;
    const { versionControlData } = this.props;
    
    const columns =[{
      title:"Sync Type",
      dataIndex: "versionType",
      key: "versionType"
    }, {
      title:"Last Synced On",
      dataIndex: "lastSyncStartTime",
      key: "lastSyncStartTime"
    }, {
      title:"Elapsed Time",
      render: (text, row) => <Tag>{row.lastSyncEndTime - row.lastSyncStartTime}</Tag>
    }, {
      title:"Start Sync",
      render: (text, row) => {<Button icon={"play-circle"}/>}
    }];
    
    return (<Spin spinning={loading} >
      <Table 
        columns={columns}
        dataSource={versionControlData}
        expandedRowRender={this.viewNestedTable}
        size="small"
      /></Spin>
    );
  }
}

function mapStateToProps(state) {
  return {
    versionControlData: state.get('tree').get('getVersionControlData')
  }
}

export default withRouter(connect(mapStateToProps)(VersionControlContainer));