require('dotenv').config();
const mysql = require('promise-mysql');

module.exports.mariaGetData = (event, context, callback) => {

  mysql
    .createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })
    .then((conn) => {
      let result = conn.query('SELECT * FROM master');
      conn.end();
      return result;
    })
    .then((results) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(results)
      }
      callback(null, response);
    })


}