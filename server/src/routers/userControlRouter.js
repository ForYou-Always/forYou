const express = require('express');
const router = express.Router();
const userControlService = require('../service/userControlService');
const postService = require('../service/postService');

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


router.post('/register',async (req, res, next) => {
  const responseResult= await userControlService.registerNewUser(req, res, next);
  res.send({responseResult});
});


router.post('/forgot-password', async (req, res, next) => {
  const responseResult=  await userControlService.requestForgotPassword(req, res, next);
  res.send({ responseResult });
});

router.post('/reset-password', async (req, res, next) => {
  const responseResult=  await userControlService.resetUserPassword(req, res, next);
  res.send({responseResult});
});

router.post('/post', async (req, res, next) => {
  const responseResult=  await postService.newPostRegister(req, res, next);
  res.send(responseResult);
});

router.put('/update/personal-info',(req,res) => {

});

module.exports = router;
