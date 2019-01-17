const { mongORM } = require('../connection');
const { Schema, model } = mongORM;
const CONSTANTS = require('./collectionConst');

const newsFeedSchema = new Schema({
    userDetail : Map,
    description : String,
    fileIds : Array,
    comment : Array,
    childComment : Map,
    likedBy : Array,
    dislikedBy : Array,
    sharedBy : Array,
    tagedUsers : Array,
    uploadTime : Date,
    modifiedTime : { type: Date, default: Date.now }
});

const newsFeedSchemaExample = new Schema({
    userDetails:{
        id: {type : String, default : ''},
        src: {type : String, default : ''},
        name: {type : String, default : ''}
    },
    description: {type : String, default : ''},
    files: {
        id: {type : String, default : ''},
        src: {type : String, default : ''},
        contentType: {type : String, default : ''}
    },
    comment: {
        id: {type : String, default : '-1'},
        childIds: {type : Array, default : []},
        commentContent: {type : String, default : ''},
        authorId: {type : String, default : ''},
        authorSrc: {type : String, default : ''},
        time: { type: Date, default: Date.now },
        likedBy: {type : Array, default : []},
        dislikedBy: {type : Array, default : []}
    },
    childCommentData : {
        childId:{
            id: {type : String, default : ''},
            childIds: {type : Array, default : []},
            commentContent: {type : String, default : ''},
            authorId: {type : String, default : ''},
            authorSrc: {type : String, default : ''},
            time: { type: Date, default: Date.now },
            likedBy: {type : Array, default : []},
            dislikedBy: {type : Array, default : []}
        }
    },
    uploadTime: Date,
    modifiedTime: { type: Date, default: Date.now },
    likedBy: {type : Array, default : []},
    dislikedBy: {type : Array, default : []},
    sharedBy: {type : Array, default : []},
    tagedUsers: {type : Array, default : []}
});

/*
 * Define Models
 **/
const NewsFeedModel = model(CONSTANTS.NEWS_FEED, newsFeedSchema);

module.exports={
    NewsFeedModel,
 };
