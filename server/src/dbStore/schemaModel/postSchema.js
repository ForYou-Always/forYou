const { mongORM } = require('../connection');
const { Schema, model } = mongORM;
const CONSTANTS = require('./collectionConst');

const postControlSchema = new Schema({
  inputProductsNumber: Number,
  products: String,
  bigVehicle: String,
  productUsed: String,
  typesVolunters: String,
  postDetails:String,
  status:String,
  create_date: { type: Date, default: Date.now },
  update_date: { type: Date, default: Date.now }
});




/*
 * Define Models
 **/
const PostControlModel = model(CONSTANTS.POST_CONTROL, postControlSchema);

module.exports={    PostControlModel
};
