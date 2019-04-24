require('dotenv').config();
const mysql = require('promise-mysql');
const redis = require('redis');

module.exports.mariaSavesRedisData = (event, context, callback) => {
    const client = redis.createClient({ url: 'redis://redisk.fsgenx.ng.0001.euc1.cache.amazonaws.com:6379' });
    const request = JSON.parse(event.body);
    let values = [];
    let response1;

    function valuesToArray(obj) {
        return Object.keys(obj).map(function(key) { return obj[key]; });
    };
    client.hgetall(request.hash, function(err, result) {
        if (err) console.log(err)
        values = valuesToArray(result);
        console.log(typeof values);
        console.log(`result   ${JSON.stringify(result)}`);
        //console.log(`result[0].name   ${JSON.stringify(values[0].name)}`);
        //console.log(Object.keys(JSON.stringify(result)).[0]);
        const response = {
            statusCode: 200,
            body: JSON.stringify(result)
        }
        client.quit();
        callback(null, response);
    });
    // mysql
    //     .createConnection({
    //         host: process.env.HOST,
    //         user: process.env.USER,
    //         password: process.env.PASSWORD,
    //         database: process.env.DATABASE
    //     })
    //     .then((conn) => {
    //         console.log('connected');
    //         console.log(values);
    //         values.forEach(value =>{
    //           conn.query(`INSERT INTO master (data) VALUE ('${value}')`);
    //           console.log(`data added ${value}`)
    //         })
    //         conn.end();
    //         console.log(`Connection end`);
    //         const response = {
    //             statusCode: 200,
    //             body: JSON.stringify('Data successfully stored')
    //         }
    //         callback(null, response);
    //     })
    //     .catch(err => console.log(err))

}