const crypto = require('crypto');
const { UserControlModel, UserSaltModel } = require('../dbStore/schemaModel/userSchema');
const { RoleModel, UserRoleModel} = require('../dbStore/schemaModel/roleSchema');
const profiles = require('../startupScripts/legacyProfiles');
const roleList = require('../startupScripts/roleData');
const userRoleList = require('../startupScripts/userRoleData');

const profileScript = async () =>{
  profiles.forEach(async (mail_id) => {
    await secureUserProfile(mail_id, mail_id);
  });
};

const addRoleInfo = async () => {
  roleList.forEach(async (role) => {
    await addRoles(role);
  });
};

async function addRoles (role) {
  const roleExists = await checkRoleExists(role);
  if(roleExists) {
    return;
  }

  const data = {
      role,
      create_date: new Date()
  }
  const roleDto = new RoleModel(data);
  await roleDto.save();
}

async function checkRoleExists(role){
  const roleInfo = await RoleModel.findOne({ role });
  return !!roleInfo;
}

const addUserRoleInfo = async () => {
  userRoleList.forEach(async (userInfo) => {
    await addUserRoles(userInfo);
  });
};

async function addUserRoles (userInfo) {
  const { mail_id, role } = userInfo;
  const userExists = await UserSaltModel.findOne({ mail_id })
  if(userExists) {
    return;
  }

  const data = {
      mail_id,
      role,
      create_date: new Date()
  }
  const userRoleDto = new UserRoleModel(data);
  await userRoleDto.save();
}

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
    profileScript,
    addRoleInfo
}