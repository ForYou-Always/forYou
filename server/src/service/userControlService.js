const { UserControlModel, UserSaltModel } = require('../dbStore/schemaModel/userSchema');

const registerNewUser = async(req, res) => {
	const userRegisterData = req.body;
	const userControl = new UserControlModel();
//	await userControl.save();
	return userRegisterData;
};

module.exports = {
  registerNewUser
}