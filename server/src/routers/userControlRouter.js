const express = require('express');
const router = express.Router();
const userControlService = require('../service/userControlService');

/*log to register the incoming request*/
router.use((req,res,next) => {
	console.debug();
	next();
});

router.get('/info/:mail',async (req,res,next) => {
	
});

router.post('/signin',async (req,res,next) => {
  const response = await userControlService.validateUser(req,next);
  res.send(response);
});

router.post('/signup', async(req,res,next) => {
  const response = await userControlService.registerNewUser(req, next);
  console.log('------------->', response);
  res.send(response);
});

router.put('/update/personal-info', async(req, res, next) => {
	
});

module.exports = router;