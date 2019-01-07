const mongORM = require('mongoose');
const { database } = require('../../server-properties');
const { type, server, name, prod_server } = database;

const formUrlPath = `${type}${server}${name}`;

mongORM.connect(formUrlPath, { useNewUrlParser: true });
//mongORM.connect(prod_server, { useNewUrlParser: true });

module.exports={
    mongORM
};