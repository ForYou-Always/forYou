import { Upload, Icon, Modal } from 'antd';
import React from 'react';

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  };
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = ({ fileList }) => this.setState({ fileList })
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const leftTopPadding = {
      padding: '8px 0 0 56px'
    };
    return (
      <div className="clearfix" style={leftTopPadding}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}>
            <div>
              <Icon type="plus"/>
              <div className="ant-upload-text">Upload</div>
            </div>
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt=" No Preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;