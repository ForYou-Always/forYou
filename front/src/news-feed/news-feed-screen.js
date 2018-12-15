import React from 'react';
import NewsFeed from './news-feed';
import { Layout, Avatar, Card, Row, Col, Input, Button} from 'antd';
import getData from './json-data';
import PicturesWall from './pictures-wall';
const { Header, Sider, Content } = Layout;
const { Meta } = Card;
const TextArea = Input.TextArea;

class NewsFeedScreen extends React.Component{
    render(){
        const data = getData();
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
                <Layout>
                    <Header style={headerColor}></Header>
                    <Layout>
                        <Sider style={siderColor}></Sider>
                        <Layout>
                            <Content>
                                <Card style={padding}>
                                    <Row type="flex" justify='start' align='middle'>
                                        <Col span={22}>
                                            <Meta style={padding}
                                                avatar={<Avatar src={userDetails.loginUserDetails.src}/>}
                                                title={<TextArea placeholder='Whats in your mind.'
                                                autosize={{ minRows: 2, maxRows: 6 }}/>}/>
                                        </Col>
                                        <Col span={2}>
                                            <Button type='primary'>Post</Button>
                                        </Col>
                                    </Row>
                                    <PicturesWall></PicturesWall>
                                </Card>
                                {data.map((value,index) => <NewsFeed key={index} value={value}></NewsFeed>)}
                            </Content>
                            <Sider style={siderColor}></Sider>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default NewsFeedScreen;