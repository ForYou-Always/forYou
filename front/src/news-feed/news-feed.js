import React from 'react';
import ReactDom from 'react-dom';
import { Layout, Avatar, Card, Comment, Icon, Input} from 'antd';
const { Header, Sider, Content } = Layout;
const { Meta } = Card;

class NewsFeed extends React.Component{
    render(){
        return (
            <div>
            <Card style={{ padding: '8px 8px 8px 8px', border: '1px solid #e8e8e8' }}>
                <Meta style={{ padding: '8px 8px 8px 8px', border: '1px solid #e8e8e8', width: 600 }}
                avatar={<Avatar src={this.props.value.loginUserDetails.src} />}
                title={<Input placeholder='Whats in your mind.' addonAfter={<Icon type='message'></Icon>}/>}/>
            </Card>
            <Card>
                <Meta style={{ padding: '8px 8px 8px 8px', border: '1px solid #e8e8e8', width: 600 }}
                avatar={<Avatar src={this.props.value.userDetails.src} />}
                title={<div><span>{this.props.value.userDetails.name}</span><span style={{paddingLeft:'8px'}} className="ant-comment-content-author ant-comment-content-author-time">few minues ago</span></div>}
                description={this.props.value.description}/>
                <Card style={{ width: 600 }}
                    cover={<img alt="example" src={this.props.value.files.src} />}>
                    <Comment
                        author={<a>{this.props.value.comment.authorName}</a>}
                        avatar={<Avatar src={this.props.value.userDetails.src} />}
                        content={<p>{this.props.value.comment.commentContent}</p>}>
                        <Icon style={{padding: '0 8px 8px 0'}} type="smile"/>
                        <Icon style={{padding: '0 8px 8px 0'}} type="like"/>
                        <Icon style={{padding: '0 8px 8px 0'}} type="dislike"/>
                        <Icon style={{padding: '0 8px 8px 0'}} type="share-alt"/>
                        <Input placeholder='Add a comment' addonAfter={<Icon type='message'></Icon>}/>
                    </Comment>
                </Card>
                <Card style={{ width: 600 }}>
                    <Icon style={{padding: '0 8px 8px 0'}} type="smile"/>
                    <Icon style={{padding: '0 8px 8px 0'}} type="like"/>
                    <Icon style={{padding: '0 8px 8px 0'}} type="dislike"/>
                    <Icon style={{padding: '0 8px 8px 0'}} type="share-alt"/>
                    <Input placeholder='Add a comment' addonAfter={<Icon type='message'></Icon>}/>
                </Card>
            </Card>
        </div>
    )
    }
}

export default NewsFeed;