require('dotenv').config();
const mysql = require('promise-mysql');

module.exports.mariaSetData = (event, context, callback) => {

    mysql
        .createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        })
        .then((conn) => {
            console.log('connected');
            const data = JSON.parse(event.body);
            conn.query(`INSERT INTO master (data) VALUE ('${data.data}')`);
            conn.end();
            console.log(`Connection end`);
            const response = {
                statusCode: 200,
                body: JSON.stringify('Data successfully stored')
            }
            callback(null, response);
        })
        .catch(err => console.log(err))
}