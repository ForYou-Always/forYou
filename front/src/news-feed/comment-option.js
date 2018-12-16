import React from 'react';
import {Row, Col, Button, Input } from 'antd';
const ButtonGroup = Button.Group;
const TextArea = Input.TextArea;

class CommentOption extends React.Component {
    render(){
        return (
            <Row type="flex" justify='space-between' align='middle'>
                <Col span={4}>
                    <ButtonGroup>
                        <Button icon='like' shape='circle'></Button>
                        <Button icon='dislike'></Button>
                        <Button icon='smile'></Button>
                        <Button icon='share-alt'></Button>
                    </ButtonGroup>
                </Col>
                <Col span={16} style={{paddingLeft:'8px'}}>
                    <TextArea placeholder='Add a comment'/>
                </Col>
                <Col span={4} style={{paddingLeft:'8px'}}>
                    <Button type='primary'>Comment</Button>
                </Col>
            </Row>
        );
    }
}

export default CommentOption;