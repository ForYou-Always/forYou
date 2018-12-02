const { userControlModel, userSaltModel } = require('../dbStore/schemaModel/userSchema');

const registerNewUser = async(req, res) => {
	const userRegisterData = req.body;
	console.log('------------->',userRegisterData);
	const userControl = new userControlModel();
//	await userControl.save();
};

module.exports = {
  registerNewUser
}