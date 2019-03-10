const express = require('express');
const router = express.Router();
const intraWebService = require('../service/intraWebService');

router.get('/version/control',async (req,res,next) => {
  const result = await intraWebService.getVersionControlData(req,res,next);
  res.send(result);
});

module.exports = router;
