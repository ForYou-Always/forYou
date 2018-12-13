var data = {
    id: {
        userDetails:{
            id: String,
            src: String,
            name: String
        },
        subject: String,
        description: String,
        files: {
            id: String,
            src: String,
            contentType: String
        },
        comment: {
            id: String,
            childId: String,
            commentContent: String,
            authorId: String,
            authorSrc: String,
            time: Date,
            likedBy: [],
            dislikedBy: []
        },
        childCommentData : {
            childId:{
                id: String,
                childId: String,
                commentContent: String,
                authorId: String,
                authorSrc: String,
                time: Date,
                likedBy: [],
                dislikedBy: []
            }
        },
        uploadTime: Date,
        modifiedTime: Date,
        likedBy: [],
        dislikedBy: [],
        sharedBy: [],
        tagedUsers: []
        }
    }