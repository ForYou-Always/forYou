const jwt = require('jsonwebtoken');
const { authentication } = require('../../server-properties');
const { PostControlModel } = require('../dbStore/schemaModel/postSchema');

const newPostRegister = async (req, res, next) => {
  const postInformation = req.body;
  await postControlSave(postInformation, next);
};

const postControlSave = async(postRegisterData, next) => {
  console.log('postRegisterDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',postRegisterData);
  const { inputProductsNumber,
    products,
    bigVehicle,
    productUsed,
    typeVolunters,
    upload,
    postDetails} = postRegisterData;
    
    const postControlDao = new PostControlModel ({
      InputProductsNumber:inputProductsNumber,
      Products:products,
      BigVehicle:bigVehicle,
      ProductUsed:productUsed,
      Typesofvolunters:typeVolunters,
      Upload:upload,
      PostDetails:postDetails
    });
    

    return await postControlDao.save();
//  res.clearCookie(tokenName).send({ msg: `Logout Success` });
};

module.exports = {
    newPostRegister
}