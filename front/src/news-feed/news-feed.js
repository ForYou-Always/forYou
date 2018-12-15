import React from 'react';
import { Avatar, Card, Comment} from 'antd';
import CommentOption from './comment-option';
const { Meta } = Card;

class NewsFeed extends React.Component{
    render(){
        const paddingBorderWidth = {
            padding: '8px 8px 8px 8px',
            border: '1px solid #e8e8e8'
        };
        return (
            <div>
                <Card>
                    <Meta style={paddingBorderWidth}
                        avatar={<Avatar src={this.props.value.userDetails.src} />}
                        title={
                        <div>
                            <span>{this.props.value.userDetails.name}
                            </span>
                            <span style={{paddingLeft:'8px'}}
                                className="ant-comment-content-author ant-comment-content-author-time">
                                few minues ago
                            </span>
                        </div>}
                        description={this.props.value.description}/>
                    <Card cover={<img alt="example" src={this.props.value.files.src} />}>
                        <Comment
                            author={<a>{this.props.value.comment.authorName}</a>}
                            avatar={<Avatar src={this.props.value.userDetails.src} />}
                            content={<p>{this.props.value.comment.commentContent}</p>}>
                            <CommentOption></CommentOption>
                        </Comment>
                    </Card>
                    <Card>
                        <CommentOption></CommentOption>
                    </Card>
                </Card>
            </div>
        )
    }
}

export default NewsFeed;