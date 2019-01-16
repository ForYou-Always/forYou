const { NewsFeedModel } = require('../dbStore/schemaModel/userSchema');

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
  const userData = await newsFeedModel.save();
  console.log(userData);
  return userData;
};

module.exports = {
    newPost
}