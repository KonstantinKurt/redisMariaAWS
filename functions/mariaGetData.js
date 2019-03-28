require('dotenv').config();
const mysql = require('promise-mysql');

module.exports.mariaGetData = (event, context, callback) => {

  mysql
    .createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      //database: process.env.DATABASE
    })
    .then(function (conn) {
      let result = conn.query('SELECT * FROM tableName');
      conn.end();
      return result;
    })
    .then(function (results) {
      const response = {
        statusCode: 200,
        body: JSON.stringify(results)
      }
      callback(null, response);
    })


}