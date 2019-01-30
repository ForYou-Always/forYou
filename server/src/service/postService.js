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
//  res.clearCookie(tokenName).send({ msg: `Logout Success` });
};

const getDeliveredPost = async() => {
  const deliveredPostData = await PostControlModel.find();
  return deliveredPostData;
}

module.exports = {
    newPostRegister,
    getDeliveredPost
}