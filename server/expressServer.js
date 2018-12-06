const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const CONST = require('./src/constant.js');

const userControlRouter = require(CONST.USER_CONTROL_ROUTER);


/*To allow cross-origin request from other servers*/
server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
//	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


/*app-server will run on this port*/
server.listen(2020);

/*app-server start confirmation*/
//server.get('/', (req,res) => res.send('Server Started'));

/*Configure static files*/
//server.use(express.static('static'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

/*
 *Express Routing with middleware
 *Require module-router file
 *configure it with suitable prefix
 */
server.use('/user', userControlRouter);
