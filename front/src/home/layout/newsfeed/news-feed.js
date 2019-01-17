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
        const userSrc = this.props.value.userDetail ? this.props.value.userDetail.src : '';
        const userName = this.props.value.userDetail ? this.props.value.userDetail.name : '';
        const commentName = this.props.value.comment.length > 0 ? this.props.value.comment[0].authorName : '';
        const commentContent = this.props.value.comment.length > 0 ? this.props.value.comment[0].commentContent : '';
        const fileList = this.props.value.fileIds.length > 0 ? this.props.value.fileIds[0].src : '';
        const modifiedTime = this.props.value.modifiedTime ? this.props.value.modifiedTime : ''; 
        return (
            <div>
                <Card>
                    <Meta style={paddingBorderWidth}
                        avatar={<Avatar src={this.userSrc} />}
                        title={
                        <div>
                            <span>{this.userName}
                            </span>
                            <span style={{paddingLeft:'8px'}}
                                className="ant-comment-content-author ant-comment-content-author-time">
                                {modifiedTime}
                            </span>
                        </div>}
                        description={this.props.value.description}/>
                    { this.fileList && this.fileList.map((file, index) => <Card cover={<img alt="example" src={file} />}>
                        <Comment
                            author={<a>{this.commentName}</a>}
                            avatar={<Avatar src={this.userSrc} />}
                            content={<p>{this.commentContent}</p>}>
                            <CommentOption></CommentOption>
                        </Comment>
                    </Card>)}
                   {this.commentContent && <Card>
                        <CommentOption></CommentOption>
                    </Card>}
                </Card>
            </div>
        )
    }
}

export default NewsFeed;