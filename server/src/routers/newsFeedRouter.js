const express = require('express');
const router = express.Router();
const newsFeedService = require('../service/newsFeedService');

/*log to register the incoming request*/
router.use((req,res,next) => {
  console.debug();
  next();
});

router.post('/newPost', async (req,res,next) => {
  console.log('newPost starts');
  await newsFeedService.newPost(req, res, next);
  console.log('newPost starts');
});

module.exports = router;
