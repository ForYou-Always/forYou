import React from 'react';
import { Layout, Avatar, Card, Row, Col, Input, Button, Modal, notification} from 'antd';
import { newPost, getNewsFeed } from './flux/newsfeedAction';
import PostCard from './components/post-card';
import PicturesWall from './components/pictures-wall';
const { Header, Sider, Content } = Layout;
const { Meta } = Card;
const TextArea = Input.TextArea;

class NewsFeed extends React.Component{
    data = [];
    state = {
        data : this.data,
        postDrawerVisible: false
    };
    componentDidMount(){
        getNewsFeed().then(result=>{
            this.data = result;
            this.setState({data:this.data});
        }).catch(this.handleNewsFeedError);
    }
    clickPostButton = async() => {
        if(!this.refs.postTextArea.textAreaRef.value){
            notification.error({
                message: 'Post Message is Empty'
            });
            return;
        }
        await this.handleNewPost().catch(this.handleNewsFeedError);
    }
    handleNewPost = async() => {
        const param = {};
        param['description'] = this.refs.postTextArea.textAreaRef.value;
        const value = await newPost(param, this.props.dispath);
        if(value) {
            this.data = [value, ...this.data];
            this.setState({data:this.data});
            this.refs.postTextArea.textAreaRef.value = '';
            this.onClosePost();
            notification.success({
                message: 'Posted Successfully'
            });
        }else{
            notification.error({
                message: { value }
            });
        }
    }
    handleNewsFeedError = (error) => {
        notification.error({
            message: {error}
        });
    }
    onClosePost = () => {
        this.setState({postDrawerVisible :false});
    }
    showAddPost = () => {
        this.setState({postDrawerVisible : true});
    }
    render(){
        const userDetails = {
            loginUserDetails:{
                id: 'praveen',
                src: "./front/src/styles/images/userImg1.png",
                name: 'Praveen kumar'
            }
        };
        const headerColor = {
            background: 'rgb(215, 182, 245)'
        };
        const siderColor = {
            padding: '8px 8px 8px 8px',
            background: 'rgb(199, 206, 216)'
        };
        const padding = {
            padding: '8px 8px 8px 8px'
        };
        return (
            <div>
                <Modal
                title="Create a new account"
                visible={this.state.postDrawerVisible}
                onOk={this.clickPostButton.bind(this)}
                onCancel={this.onClosePost}>
                    <Card style={padding}>
                        <Row type="flex" justify='start' align='middle'>
                            <Meta style={padding}
                                avatar={<Avatar src={userDetails.loginUserDetails.src}/>}
                                title={<TextArea ref='postTextArea' placeholder='Whats in your mind.'
                                autosize={{ minRows: 2, maxRows: 6 }}/>}/>
                        </Row>
                        <PicturesWall ref='refPicturesWall'></PicturesWall>
                    </Card>
                </Modal>
                <div>
                    <Button style={{float: 'right',marginTop: '-65px'}} type="primary" shape="circle" icon="plus" onClick={this.showAddPost}/>
                </div>
                <div style={{overflowY: 'scroll',height: '440px'}}>
                    {this.state.data.map((value,index) => <PostCard key={index} value={value}></PostCard>)}
                </div>
            </div>
        )
    }
}

export default NewsFeed;