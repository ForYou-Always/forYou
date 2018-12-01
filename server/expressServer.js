const express = require('express');
const server = express();

/*app-server will run on this port*/
server.listen(2020);

/*app-server start confirmation*/
server.get('/', (req,res) => res.send('Server Started'));


/*
 *Express Routing
 *Require module-router file
 *configure it with suitable prefix
 */
