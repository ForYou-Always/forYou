const crypto = require('crypto');
//const session = require('express-session');

const jwt = require('jsonwebtoken');
const { authentication } = require('../../server-properties');

const { UserControlModel, UserSaltModel } = require('../dbStore/schemaModel/userSchema');

const registerNewUser = async(req, next) => {
  const userRegisterData = req.body;
  const userControl = new UserControlModel();
//await userControl.save();
  return userRegisterData;
};

const validateUser = async(req, res, next) => {
  const { user_name, password } = req.body;
  const userSaltInfo = await UserSaltModel.findOne({ mail_id: user_name });
  if(!userSaltInfo){
    next({ customError: 'User doesnot Exists', userSaltInfo})
    return;
  }

  const { salt, iterations } = userSaltInfo;
  const passwordHash = getHashedPassword(salt, password, iterations);

  const userHashInfo = await UserControlModel.findOne({ mail_id: user_name });

  if(passwordHash !== userHashInfo.hash){
    next({ customError: 'Invalid Credentials'})
    return;
  }

  await authenticateUser(userHashInfo._id, res, next);
}

const authenticateUser = async(userId, res) => {
  const { secret, tokenName} = authentication;
  const generatedJWT = jwt.sign({ userId }, secret);
  res.cookie(tokenName, generatedJWT).send({success: "Authentication Successful"});
}


function getHashedPassword (salt, password, iterations){
  return crypto.pbkdf2Sync(password, salt, iterations, 64, `sha512`).toString(`hex`); 
}

module.exports = {
    registerNewUser,
    validateUser
}