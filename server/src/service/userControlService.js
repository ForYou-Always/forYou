const { userControlModel, userSaltModel } = require('../dbStore/schemaModel/userSchema');

const registerNewUser = async(req, res) => {
	const userRegisterData = req.body;
	const userControl = new userControlModel();
//	await userControl.save();
	return userRegisterData;
};

module.exports = {
  registerNewUser
}