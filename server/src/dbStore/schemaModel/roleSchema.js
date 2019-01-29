const { mongORM } = require('../connection');
const { Schema, model } = mongORM;
const CONSTANTS = require('./collectionConst');

const roleSchema = new Schema({
  role: String,
  create_date: { type: Date },
  update_date: { type: Date, default: Date.now }
});

const userRoleSchema = new Schema({
  mail_id: String,
  role: String,
  create_date: { type: Date },
  update_date: { type: Date, default: Date.now }
});


/*
 * Define Models
 **/
const RoleModel = model(CONSTANTS.ROLE, roleSchema);
const UserRoleModel = model(CONSTANTS.USER_ROLE, userRoleSchema);

module.exports={
    RoleModel,
    UserRoleModel
};
