const express = require('express');
const router = express.Router();
const postService = require('../service/postService');

/*log to register the incoming request*/
router.use((req,res,next) => {
  console.debug();
  next();
});

router.post('/newPost', async (req, res, next) => {
  const responseResult=  await postService.newPostRegister(req, res, next);
  res.send(responseResult);
});

router.get('/newPost', async (req, res, next) => {
  const responseResult=  await postService.getDeliveredPost();
  res.send(responseResult);
});

module.exports = router;
