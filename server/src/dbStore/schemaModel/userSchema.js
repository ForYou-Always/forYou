const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const CONSTANTS = require('./collectionConst');

const userControlSchema = new Schema({
	mail_id,
	user_name,
	hash,
	create_date,
	update_date
});

const userSaltSchema = new Schema({
	mail_id,
	salt,
	iterations
});


/*
 * Define Models
 **/
const userControlModel = model(CONSTANTS.USER_CONTROL, userControlSchema);
const userSaltlModel = model(CONSTANTS.USER_SALT, userControlSchema);

module.exports={
  userControlModel,
  userSaltlModel
};
