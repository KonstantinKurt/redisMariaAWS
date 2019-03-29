require('dotenv').config();
const mysql = require('promise-mysql');

module.exports.clearMaria = (event, context, callback) => {

    mysql
        .createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        })
        .then((conn) => {
            console.log('connected');
            conn.query(`TRUNCATE TABLE master`);
            conn.end();
            const response = {
                statusCode: 200,
                body: JSON.stringify('All data successfully deleted')
            }
            callback(null, response);
        })
        .catch(err => console.log(err))
}