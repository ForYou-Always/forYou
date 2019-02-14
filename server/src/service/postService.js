const jwt = require('jsonwebtoken');
const { authentication } = require('../../server-properties');
const { PostControlModel } = require('../dbStore/schemaModel/postSchema');

const newPostRegister = async (req, res, next) => {
  const postInformation = req.body;
  const responseResult = await postControlSave(postInformation, next);
  return responseResult;
};

const postControlSave = async(postRegisterData, next) => {

    const postControlDao = new PostControlModel (postRegisterData);

    return await postControlDao.save();
};

const getDeliveredPost = async(postPutData) => {
  console.log('postPutData',postPutData.status);
  const deliveredPostData = await PostControlModel.find({ status : postPutData.status });
  
  console.log(deliveredPostData.length)
  return deliveredPostData;
}

module.exports = {
    newPostRegister,
    getDeliveredPost
}