const crypto = require('crypto');
const { UserControlModel, UserSaltModel } = require('../dbStore/schemaModel/userSchema');
const profiles = require('../startupScripts/legacyProfiles');

const profileScript = async () =>{
  profiles.forEach(async (mail_id) => {
    await secureUserProfile(mail_id, mail_id);
  });
};

async function secureUserProfile (mail_id, password) {
  const userExists = await checkUserExists(mail_id);
  if(userExists) {
    return;
  }

  const iterations = 10;
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = getHashedPassword(salt, password, iterations);
  
  const userControlModel = new UserControlModel({
    mail_id,
    user_name: mail_id,
    hash: hashedPassword
  });

  const controlData = await userControlModel.save();

  const userSaltlModel = new UserSaltModel({
    _id: controlData._id,
    mail_id,
    salt,
    iterations
  });

  await userSaltlModel.save();
};

function getHashedPassword (salt, password, iterations){
  return crypto.pbkdf2Sync(password, salt, iterations, 64, `sha512`).toString(`hex`); 
}


async function checkUserExists(mail_id){
  let exists = false;
  const userInfo = await UserControlModel.findOne({ mail_id: mail_id });
  if(userInfo){
    exists = true;
  }
  return exists;
}

module.exports ={
    profileScript
}