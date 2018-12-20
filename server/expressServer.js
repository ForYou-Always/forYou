const express = require('express');
const server = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const CONST = require('./src/constant');
const { validateSession } = require('./src/utility/authenticationFilter');
const { profileScript } = require('./src/service/startupAsyncService');

const userControlRouter = require(CONST.USER_CONTROL_ROUTER);


/*To allow cross-origin request from other servers*/
server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
//	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

server.use(cookieParser());
//server.use(session({ secret: 'Hope this is not a good secret key. Hahaha...' }));


/*Configure static files
 * Authenticate static file-serve
 * */
server.use(express.static('../static'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.get('*', async (req,res,next) => await validateSession(req,res,next));


/*
 *Express-Routing  middleware
*/ 
server.use('/user', validateSession, userControlRouter);


/*Custom Error handler*/
server.use((err,req,res,next) => {
  res.status(500).send(err);
});

profileScript();


/*app-server will run on this port*/
server.listen(process.env.PORT || 2020);