const express = require('express');
const router = express.Router();
//const { validateSession } = require('../utility/utils');
const userControlService = require('../service/userControlService');

/*log to register the incoming request*/
router.use(async (req,res,next) => {
	next();
});

router.get('/info/:mail', async (req,res,next) => {
	
});

router.post('/signin', async (req,res,next) => {
  await userControlService.validateUser(req, res, next);
});

router.post('/signup', async(req,res,next) => {
  const response = await userControlService.registerNewUser(req, next);
  res.send(response);
});

router.get('/signout', async(req, res, next) => {
  userControlService.signOutUser(res, next);
});

module.exports = router;
