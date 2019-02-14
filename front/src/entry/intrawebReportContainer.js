import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Upload, message, Button, Icon, Form} from 'antd';
import '../styles/form.css';

const homeRedirectPath = 'home.html#/home';
const FormItem = Form.Item;
const styles = {
    iconStyle:{
      color: 'rgba(0,0,0,.25)'
    },
    rememberBox:{
      color:'red'
    }
}

const csv=require('csvtojson');
const csvFilePath='G:/Intraweb/Test/UploadData.csv';

//let fileOutputName = 'G:/Intraweb/Test/myOutputFile.json';
 
const uploadData = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    }
}

class intrawebReportContainer extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        loading: false,
    }
  }
  
  onChange= (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      }
  };
  
   
  // Async / await usage
//  const jsonArray=await csv().fromFile(csvFilePath);
	
 

	render() {
	  csv().fromFile(csvFilePath).then((jsonObj)=>{
      console.log(jsonObj);
  })

		return (
		    <Upload  uploadData >
		    <Button>
		      <Icon type="upload" /> Click to Upload
		    </Button>
		  </Upload>
		  );
	}
}

const WrappedintrawebReportContainer = Form.create()(intrawebReportContainer);
export default withRouter(connect(null)(WrappedintrawebReportContainer));