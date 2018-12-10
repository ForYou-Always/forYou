const crypto = require('crypto');
const session = require('express-session');
const { UserControlModel, UserSaltModel } = require('../dbStore/schemaModel/userSchema');

const registerNewUser = async(req, next) => {
	const userRegisterData = req.body;
	const userControl = new UserControlModel();
//	await userControl.save();
	return userRegisterData;
};

const validateUser = async(req, next) => {
  const { mail_id, password } = req.body;
  const userSaltInfo = await UserSaltModel.findOne({ mail_id: mail_id });
  if(!userSaltInfo){
    next({ customError: 'Invalid Credentials '})
    return;
  }
  
  const { salt, iterations } = userSaltInfo;
  const passwordHash = getHashedPassword(salt, password, iterations);

  const userHashInfo = await UserControlModel.findOne({ mail_id: mail_id });
  
  if(passwordHash !== userHashInfo.hash){
    next({ customError: 'Invalid Credentials '})
    return;
  }
  
  await authenticateUser(userHashInfo);
  return { login: 'success' };
}

const authenticateUser = async(req, next) => {
  session({ });
}


function getHashedPassword (salt, password, iterations){
  return crypto.pbkdf2Sync(password, salt, iterations, 64, `sha512`).toString(`hex`); 
}


module.exports = {
  registerNewUser,
  validateUser
}