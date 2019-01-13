var data = {
    userDetails:{
        id: String,
        src: String,
        name: String
    },
    description: String,
    files: {
        id: String,
        src: String,
        contentType: String
    },
    comment: {
        id: String,
        childIds: List,
        commentContent: String,
        authorId: String,
        authorSrc: String,
        time: { type: Date, default: Date.now },
        likedBy: List,
        dislikedBy: List
    },
    childCommentData : {
        childId:{
            id: String,
            childIds: List,
            commentContent: String,
            authorId: String,
            authorSrc: String,
            time: { type: Date, default: Date.now },
            likedBy: List,
            dislikedBy: List
        }
    },
    uploadTime: Date,
    modifiedTime: { type: Date, default: Date.now },
    likedBy: List,
    dislikedBy: List,
    sharedBy: List,
    tagedUsers: List
}