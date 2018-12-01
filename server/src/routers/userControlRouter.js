const express = require('express');
const router = express.Router();

/*log to register the incoming request*/
router.use((req,res,next) => {
	console.debug();
	next();
});

router.get('/info/:mail',(req,res) => {
	
});

router.post('/signin',(req,res) => {
	
});

router.post('/signup',(req,res) => {
	
});

router.put('/update/personal-info',(req,res) => {
	
});

module.exports = router;