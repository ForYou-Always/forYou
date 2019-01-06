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

router.post('/signin', async (req,res,next) => {
  await userControlService.validateUser(req, res, next);
});

router.get('/signout', async(req, res, next) => {
  userControlService.signOutUser(res, next);
});


router.post('/register',async (req,res) => {
  const responseResult= await userControlService.registerNewUser(req);
  res.send({responseResult});
});


router.post('/forgot-password', async (req,res) => {
  console.log('-----------------------',req.body);
  const responseResult=  await userControlService.registerForgotPassword(req);
  res.send({responseResult});
});

router.post('/reset-password', async (req,res) => {
  console.log('-----------------------',req.body);
  const responseResult=  await userControlService.resetUserPassword(req,res);
  res.send({responseResult});
});

router.put('/update/personal-info',(req,res) => {

});

module.exports = router;
