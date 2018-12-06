const express = require('express');
const router = express.Router();
const userControlService = require('../service/userControlService');

/*log to register the incoming request*/
router.use((req,res,next) => {
	console.debug();
	next();
});

router.get('/info/:mail',(req,res) => {
	
});

router.post('/signin',(req,res) => {
	
});

router.post('/signup', async(req,res) => {
  const response = await userControlService.registerNewUser(req);
  console.log('------------->', response);
  res.send(response);
});

router.put('/update/personal-info', async(req,res) => {
	
});

module.exports = router;