import React from 'react';
import ReactDom from 'react-dom';
import { Layout, Avatar, Card, Comment, Icon, Input} from 'antd';
const { Header, Sider, Content } = Layout;
const { Meta } = Card;

class NewsFeed extends React.Component{
    render(){
        return (
        <div>
        <Layout>
            <Header style={{background: 'rgb(111, 156, 224)'}}>John Balaji</Header>
            <Layout>
                <Sider style={{ padding: '8px 8px 8px 8px', background: 'rgb(199, 206, 216)'}}>Menu</Sider>
                <Content>
                    <Card style={{ padding: '8px 8px 8px 8px', border: '1px solid #e8e8e8' }}>
                        <Meta style={{ padding: '8px 8px 8px 8px', border: '1px solid #e8e8e8', width: 600 }}
                        avatar={<Avatar src="./front/src/styles/images/userImg1.png" />}
                        title={<Input placeholder='Whats in your mind.' addonAfter={<Icon type='message'></Icon>}/>}/>
                    </Card>
                    <Card>
                        <Meta style={{ padding: '8px 8px 8px 8px', border: '1px solid #e8e8e8', width: 600 }}
                        avatar={<Avatar src="./front/src/styles/images/userImg2.png" />}
                        title={<div><span >Rahul</span><span style={{paddingLeft:'8px'}} class="ant-comment-content-author ant-comment-content-author-time">few minues ago</span></div>}
                        description="#favorite #enjoy #morning"/>
                        <Card style={{ width: 600 }}
                            cover={<img alt="example" src="./front/src/styles/images/feedCoverImg1.jpg" />}>
                            <Comment
                                author={<a>Han Solo</a>}
                                avatar={(
                                <Avatar src="./front/src/styles/images/userImg1.png"
                                    alt="Han Solo"/>)}
                                content={<p>How was the day ?</p>}>
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
                </Content>
            </Layout>
        </Layout>
    </div>
    )
    }
}

export default NewsFeed;