const express = require('express');
const router = express.Router();
const newsFeedService = require('../service/newsFeedService');

/*log to register the incoming request*/
router.use((req,res,next) => {
  console.debug();
  next();
});

router.post('/newPost', async (req,res,next) => {
  await newsFeedService.newPost(req, res, next);
});

router.post('/getNewsFeed', async (req,res,next) => {
  const result = await newsFeedService.getNewsFeed(req, res, next);
  res.send(result);
});

module.exports = router;
