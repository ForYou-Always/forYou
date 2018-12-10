const { mongORM } = require('../connection');
const { Schema, model } = mongORM;
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
const UserControlModel = model(CONSTANTS.USER_CONTROL, userControlSchema);
const UserSaltModel = model(CONSTANTS.USER_SALT, userSaltSchema);

module.exports={
   UserControlModel,
   UserSaltModel
};
