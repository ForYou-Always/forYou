const { mongORM } = require('../connection');
const { Schema, model } = mongORM;
const CONSTANTS = require('./collectionConst');

const postControlSchema = new Schema({
  InputProductsNumber: Number,
  Products: String,
  BigVehicle: String,
  ProductUsed: String,
  Typesofvolunters: String,
  PostDetails:String,
  Status:String,
  create_date: { type: Date, default: Date.now },
  update_date: { type: Date, default: Date.now }
});




/*
 * Define Models
 **/
const PostControlModel = model(CONSTANTS.POST_CONTROL, postControlSchema);

module.exports={    PostControlModel
};
