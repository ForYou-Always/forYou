const express = require('express');
const server = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const CONST = require('./src/constant');
const { port  } = require('./server-properties').app_server;

const { validateSession } = require('./src/utility/authenticationFilter');
const { profileScript } = require('./src/service/startupAsyncService');

const userControlRouter = require(CONST.USER_CONTROL_ROUTER);
const newsFeedRouter = require(CONST.NEWS_FEED_ROUTER);


/*To allow cross-origin request from other servers*/
server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
//	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

server.use(cookieParser());

server.get('*', validateSession);

/*Configure static files
 * */
server.use(express.static('../static'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

/*
 *Express-Routing  middleware
*/ 
server.use('/user', userControlRouter);

server.use('/newsFeed', newsFeedRouter);

/*Custom Error handler*/
server.use((err,req,res,next) => {
  res.status(500).send(err);
});

//profileScript();


/*app-server will run on this port*/
server.listen(process.env.PORT || port);
