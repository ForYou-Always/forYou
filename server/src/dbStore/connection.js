const mongORM = require('mongoose');
const DB_NAME= 'for_you';
const DB_TYPE = 'mongodb://';
const DB_SERVER = 'localhost:27017/';

mongORM.connect(DB_TYPE+DB_SERVER+DB_NAME);

module.exports={
    mongORM
}