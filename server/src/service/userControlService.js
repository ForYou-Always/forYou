const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const { mailSender } = require('./mailingService');
const { authentication } = require('../../server-properties');
const { UserControlModel, UserSaltModel, UserProfileModel } = require('../dbStore/schemaModel/userSchema');

const registerNewUser = async (req, res, next) => {
  const userInformation = req.body;
  await secureAndRegisterUser(userInformation, next);
};

const resetUserPassword =  async (req, res, next) => {
  const userInformation = req.body;
//  await secureAndRegisterUser(userInformation, next);
}

const registerUserProfile =  async (req, res, next) => {
  const { mail_id, name, date_of_birth,current_living_city,photo,govt_proof_type,govt_proof_id,ngo_or_normal_user } = req.body;
  let result ;
  const userProfileDao = new UserProfileModel({
    mail_id: mail_id,
    name: name,
    date_of_birth: date_of_birth,
    current_living_city: current_living_city,
    photo: photo,
    govt_proof_type: govt_proof_type,
    govt_proof_id: govt_proof_id,
    ngo_or_normal_user: ngo_or_normal_user
  });
  const userProfileExist = await UserProfileModel.findOne({ mail_id: mail_id });
  console.log(userProfileExist);
  if(!userProfileExist){
  result = await userProfileDao.save();
  }
  console.log(result);
}

const updateUserProfile = async (req, res, next) => {
  const updateValues = req.body;
  const result = await UserProfileModel.updateOne({mail_id : updateValues.mail_id},updateValues);
  return result;
}


const deleteUserProfile = async (req, res, next) => {
  const { mail_id } = req.body;
  const result = await UserProfileModel.findOneAndDelete({mail_id : mail_id});
  return result;
}


const requestForgotPassword = async (req, res, next) => {
  const { host } = req.headers;
  const { email } = req.body;

  const mailOptions = {
      to: req.body.email,
      from: 'foryoutest01@gmail.com',
      subject: 'Node.js Password Reset'
  };

  await generateResetToken(email, next).then(async (token) => {
    mailOptions.text = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    'http://' + host + '/user/reset-password/' + token + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n';

    await mailSender(mailOptions, next);
  }).catch(err => {
    next({ customError:`Error requesting password reset` });
  });
}

async function generateResetToken(mail_id, next) {
  const resetToken = crypto.randomBytes(20).toString('hex');

  const userInfo = await UserControlModel.findOne({ mail_id });
  
  if(!userInfo){
    next({ customError:`User Doesnot Exists` });
    return;
  }

  userInfo.resetPasswordToken = resetToken;
  userInfo.resetPasswordExpires = Date.now() + 3600000;
  const userControl = new UserControlModel(userInfo);

  userControl.save();
  return resetToken;
}

async function secureAndRegisterUser (userRegisterData, next) {
  const { email, password, contact_no } = userRegisterData;
  
  const userSaltInfo = await UserSaltModel.findOne({ mail_id: email });
  if(userSaltInfo){
    next({ customError: `User already Exists ${email}`, userSaltInfo})
    return;
  }
  
  const passLength = password.length;

  const randomSalt = generateRandomString(passLength);

  const hashedSalt = generateHashedValue (randomSalt, randomSalt);
  const hashedPassword = generateHashedValue (password, hashedSalt);


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
function generateRandomString (length){
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
function generateHashedValue(value, salt){
  const hashedVal = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hashedVal.update(value);
  return hashedVal.digest('hex'); 
};


const validateUser = async(req, res, next) => {
  const { user_name, password } = req.body;
  const userSaltInfo = await UserSaltModel.findOne({ mail_id: user_name });
  if(!userSaltInfo){
    next({ customError: 'User doesnot Exists', userSaltInfo})
    return;
  }

  const { salt } = userSaltInfo;
  const hashedSalt = generateHashedValue (salt, salt);
  const hashedPassword = generateHashedValue (password, hashedSalt);
  
  const userHashInfo = await UserControlModel.findOne({ mail_id: user_name });
  if(hashedPassword !== userHashInfo.hash){
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


/*function getHashedPassword (salt, password, iterations){
  return crypto.pbkdf2Sync(password, salt, iterations, 64, `sha512`).toString(`hex`); 
}*/

const signOutUser = async(res, next) => {
  const { tokenName} = authentication;
  res.clearCookie(tokenName).send({ msg: `Logout Success` });
};

module.exports = {
    registerNewUser,
    requestForgotPassword,
    resetUserPassword,
    validateUser,
    signOutUser,
    registerUserProfile,
    updateUserProfile,
    deleteUserProfile
}