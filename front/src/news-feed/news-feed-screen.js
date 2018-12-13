import React from 'react';
import ReactDom from 'react-dom';
import NewsFeed from './news-feed';
import { Layout, Avatar, Card, Comment, Icon, Input} from 'antd';
import getData from './json-data';
const { Header, Sider, Content } = Layout;
const { Meta } = Card;

class NewsFeedScreen extends React.Component{
    render(){
        var data = getData();
        return (
        <div>
        <Layout>
            <Header style={{background: 'rgb(111, 156, 224)'}}>John Balaji</Header>
            <Layout>
                <Sider style={{ padding: '8px 8px 8px 8px', background: 'rgb(199, 206, 216)'}}>Menu</Sider>
                <Content>
                {data.map((value,index) => <NewsFeed key={index} value={value}></NewsFeed>)}
                </Content>
            </Layout>
        </Layout>
    </div>
    )
    }
}

export default NewsFeedScreen;