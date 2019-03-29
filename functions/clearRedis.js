const redis = require('redis');

module.exports.clearRedis = (event, context, callback) => {
    const client = redis.createClient({ url: 'redis://redisk.fsgenx.ng.0001.euc1.cache.amazonaws.com:6379' });
    //let id = event.pathParameters.id;
    const data = JSON.parse(event.body);
    client.flushdb(function(err, succeeded) {
       if(err) console.log(err)
        console.log(succeeded);
        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: `all data cleared`, data: null })
        }
        client.quit();
        callback(null, response);
    });

}

