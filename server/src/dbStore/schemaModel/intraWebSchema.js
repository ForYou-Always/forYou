const { mongORM } = require('../connection');
const { Schema, model } = mongORM;
const CONSTANTS = require('./collectionConst');

const versionControlStatusSchema = new Schema({
  versionType: String,
  moduleName: String,
  syncInProgress: String,
  lastSyncStartTime: { type: Date },
  lastSyncEndTime: { type: Date },
  _class: String
}, {collection:CONSTANTS.VERSION_CONTROL_STATUS});


/*
 * Define Models
 **/
const VersionControlStatusModel = model(CONSTANTS.VERSION_CONTROL_STATUS, versionControlStatusSchema);

module.exports = {
  VersionControlStatusModel
};
