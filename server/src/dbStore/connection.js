const mongORM = require('mongoose');
const DB_NAME= 'for_you1';
const DB_TYPE = 'mongodb://';
const DB_SERVER = 'localhost:27017/';

mongORM.connect(DB_TYPE+DB_SERVER+DB_NAME, { useNewUrlParser: true });
//mongORM.connect('mongodb://Vairavan:admin1234@ds135714.mlab.com:35714/for_you', { useNewUrlParser: true });

module.exports={
    mongORM
};