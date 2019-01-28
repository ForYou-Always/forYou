const { NewsFeedModel } = require('../dbStore/schemaModel/newsFeedSchema');

const newPost = async (req, res, next) => {
  const param = req.body;
  const newsFeedModel = new NewsFeedModel({
    userDetails:{
        id: 'praveen',
        src: '',
        name: 'Praveen'
    },
    description: param['description'],
    uploadTime: Date.now()
  });
  const result = await newsFeedModel.save();
  return result;
};

const getNewsFeed = async (req, res, next) => {
  const userData = await NewsFeedModel.find().sort({$natural:-1}).limit(50);
  return userData;
};

module.exports = {
    newPost,
    getNewsFeed
}