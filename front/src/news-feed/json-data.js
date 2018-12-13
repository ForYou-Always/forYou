const data = 
[
    {
        loginUserDetails:{
            id: 'praveen',
            src: "./front/src/styles/images/userImg1.png",
            name: 'Praveen kumar'
        },
        userDetails:{
            id: 'ravi',
            src: "./front/src/styles/images/userImg2.png",
            name: 'Ravi'
        },
        subject: 'Holiday enjoyment',
        description: '#morning sun #friends',
        files: {
            id: 'file_1',
            src: "./front/src/styles/images/feedCoverImg1.jpg",
            contentType: "jpg"
        },
        comment: {
            id: '1',
            childId: '-10',
            commentContent: 'How was the day??',
            authorId: 'vijay',
            authorName: 'Vijay',
            src: './front/src/styles/images/userImg2.png"',
            time: '12-12-2018',
            likedBy: ['raju','dinesh'],
            dislikedBy: ['luck']
        },
        childCommentData : {
            childId:{
            id: '-10',
            childId: '10',
            commentContent: 'Fine !!',
            authorId: 'praveen',
            authorSrc: './front/src/styles/images/userImg1.png"',
            time: '12-12-2018',
            likedBy:['raj','arjun'],
            dislikedBy: ['raj','arjun']
            }
        },
        uploadTime: '12-12-2018',
        modifiedTime: '12-12-2018',
        likedBy: ['raj','arjun'],
        dislikedBy: ['raj','arjun'],
        sharedBy: ['pradeep','mani'],
        tagedUsers: ['sarath']
        }
        ,
        {
            loginUserDetails:{
                id: 'praveen',
                src: "./front/src/styles/images/userImg1.png",
                name: 'Praveen kumar'
            },
            userDetails:{
                id: 'ravi',
                src: "./front/src/styles/images/userImg2.png",
                name: 'Ravi'
            },
            subject: 'Holiday enjoyment',
            description: '#morning sun #friends',
            files: {
                id: 'file_1',
                src: "./front/src/styles/images/feedCoverImg1.jpg",
                contentType: "jpg"
            },
            comment: {
                id: '1',
                childId: '-10',
                commentContent: 'How was the day??',
                authorId: 'vijay',
                authorName: 'Vijay',
                authorSrc: './front/src/styles/images/userImg2.png"',
                time: '12-12-2018',
                likedBy: ['raju','dinesh'],
                dislikedBy: ['luck']
            },
            childCommentData : {
                childId:{
                id: '-10',
                childId: '10',
                commentContent: 'Fine !!',
                authorId: 'praveen',
                authorSrc: './front/src/styles/images/userImg1.png"',
                time: '12-12-2018',
                likedBy:['raj','arjun'],
                dislikedBy: ['raj','arjun']
                }
            },
            uploadTime: '12-12-2018',
            modifiedTime: '12-12-2018',
            likedBy: ['raj','arjun'],
            dislikedBy: ['raj','arjun'],
            sharedBy: ['pradeep','mani'],
            tagedUsers: ['sarath']
        }
    ]

function getData() {
    return data;
}
export default getData;