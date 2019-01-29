const { mongORM } = require('../connection');
const { Schema, model } = mongORM;
const CONSTANTS = require('./collectionConst');

const userControlSchema = new Schema({
  mail_id: String,
  user_name: String,
  hash: String,
  contact_no: Number,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  create_date: { type: Date, default: Date.now },
  update_date: { type: Date, default: Date.now }
});

const userSaltSchema = new Schema({
	mail_id: String,
	salt: String,
	iterations: Number,
});


const userProfileSchema = new Schema({
  mail_id: String,
  name: String,
  date_of_birth: Date,
  current_living_city:String,
  photo:String,
  govt_proof_type:String,
  govt_proof_id:String,
  create_date: { type: Date, default: Date.now },
  update_date: { type: Date, default: Date.now }
});

/*
 * Define Models
 **/
const UserControlModel = model(CONSTANTS.USER_CONTROL, userControlSchema);
const UserSaltModel = model(CONSTANTS.USER_SALT, userSaltSchema);
const UserProfileModel = model(CONSTANTS.USER_PROFILE, userProfileSchema);

module.exports={
   UserControlModel,
   UserSaltModel,
   UserProfileModel
};
