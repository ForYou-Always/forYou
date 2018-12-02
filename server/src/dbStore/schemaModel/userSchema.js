const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const CONSTANTS = require('./collectionConst');

const userControlSchema = new Schema({
	mail_id: String,
	user_name: String,
	hash: String,
	create_date: { type: Date, default: Date.now },
	update_date: { type: Date, default: Date.now }
});

const userSaltSchema = new Schema({
	mail_id: String,
	salt: String,
	iterations: Number,
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
