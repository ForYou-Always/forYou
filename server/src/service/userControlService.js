const crypto = require('crypto');
const nodemailer = require('nodemailer');
const waterfall = require('async-waterfall');
//const session = require('express-session');

const jwt = require('jsonwebtoken');
const { authentication } = require('../../server-properties');

const { UserControlModel, UserSaltModel } = require('../dbStore/schemaModel/userSchema');

const registerNewUser = async (req, res) => {
  const userInformation = req.body;
  await secureAndRegisterUser(userInformation);
};

const resetUserPassword =  async (req, res) => {
  const userInformation = req.body;
  await secureAndRegisterUser(userInformation);
}

secureAndRegisterUser = async (userRegisterData) => {
  const { email, password, contact_no } = userRegisterData;
  const passLength = password.length;
  
  const randomSalt = generateRandomString(passLength);
  
  const hashedSalt = generateHashedValue (randomSalt, randomSalt);
  const hashedPassword = generateHashedValue (password, randomSalt);
  
  
  const userControlDao = new UserControlModel({
    mail_id: email,
    hash: hashedPassword,
    contact_no: contact_no
  });
  
  const userData = await userControlDao.save();

  const userSaltDao = new UserSaltModel({
    _id: userData._id,
    mail_id: userRegisterData.email,
    salt:  randomSalt,
  });
  await userSaltDao.save();
}

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
generateRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length/2))
  .toString('hex') /** convert to hexadecimal format */
  .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
generateHashedValue = (value, salt) => {
  const hashedVal = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hashedVal.update(value);
  return hashedVal.digest('hex'); 
};

const signOutUser = async(res, next) => {
  const { tokenName} = authentication;
  res.clearCookie(tokenName).send({ msg: `Logout Success` });
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
    registerForgotPassword,
    resetUserPassword,
    validateUser,
    signOutUser
}