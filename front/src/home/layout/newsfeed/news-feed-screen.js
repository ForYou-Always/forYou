import React from 'react';
import NewsFeed from './news-feed';
import { Layout, Avatar, Card, Row, Col, Input, Button, notification} from 'antd';
import PicturesWall from './pictures-wall';
import { newPost, getNewsFeed } from './reduxFlow/newsfeedAction';
const { Header, Sider, Content } = Layout;
const { Meta } = Card;
const TextArea = Input.TextArea;

class NewsFeedScreen extends React.Component{
    data = [];
    state = {
        data : this.data
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
                {this.state.data.map((value,index) => <NewsFeed key={index} value={value}></NewsFeed>)}
            </div>
        )
    }
}

export default NewsFeedScreen;