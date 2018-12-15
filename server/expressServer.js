const express = require('express');
const server = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const CONST = require('./src/constant');
const { profileScript } = require('./src/service/startupAsyncService');

const userControlRouter = require(CONST.USER_CONTROL_ROUTER);


/*To allow cross-origin request from other servers*/
server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
//	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

/*app-server start confirmation*/
server.get('/', (req,res) => res.redirect('door.html'));
//server.get('/', (req,res) => res.redirect('home.html'));

/*Configure static files*/
server.use(express.static('../static'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


/*app-server will run on this port*/
server.listen(2020);

/*
 *Express Routing with middleware
 *Require module-router file
 *configure it with suitable prefix
 */
server.use('/user', userControlRouter);


/*Custom Error handler*/
server.use((err,req,res,next) => {
  res.status(500).send(err);
});

//server.use(cookieParser());
//server.use(session({ secret: 'Hope this is not a good secret key. Hahaha...' }));

profileScript();
