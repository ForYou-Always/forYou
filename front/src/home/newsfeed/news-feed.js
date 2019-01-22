import React from 'react';
import { Layout, Avatar, Card, Row, Col, Input, Button, Drawer, notification} from 'antd';
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
        await newPost(param, this.props.dispath);
    }
    handleNewsFeedError = (error) => {
        notification.error({
            message: {error}
        });
    }
    onClosePostDrawer = () => {
        this.setState({postDrawerVisible :false});
    }
    showPostDrawer = () => {
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
                <Drawer
                title="Create a new account"
                width={720}
                onClose={this.onClosePostDrawer}
                visible={this.state.postDrawerVisible}
                style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px',
                }}>
                    <Card style={padding}>
                        <Row type="flex" justify='start' align='middle'>
                            <Col span={22}>
                                <Meta style={padding}
                                    avatar={<Avatar src={userDetails.loginUserDetails.src}/>}
                                    title={<TextArea ref='postTextArea' placeholder='Whats in your mind.'
                                    autosize={{ minRows: 2, maxRows: 6 }}/>}/>
                            </Col>
                            <Col span={2}>
                                <Button type='primary' onClick={this.clickPostButton.bind(this)}>Post</Button>
                            </Col>
                        </Row>
                        <PicturesWall ref='refPicturesWall'></PicturesWall>
                    </Card>
                </Drawer>
                <div>
                    <Button style={{float: 'right',marginTop: '-65px'}} type="primary" shape="circle" icon="plus" onClick={this.showPostDrawer}/>
                </div>
                <div style={{overflowY: 'scroll',height: '440px'}}>
                    {this.state.data.map((value,index) => <PostCard key={index} value={value}></PostCard>)}
                </div>
            </div>
        )
    }
}

export default NewsFeed;