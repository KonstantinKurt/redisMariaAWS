const redis = require('redis');

module.exports.redisSetData = (event, context, callback) => {
    const client = redis.createClient({ url: 'redis://redisk.fsgenx.ng.0001.euc1.cache.amazonaws.com:6379' });
    //let id = event.pathParameters.id;
    const data = JSON.parse(event.body);
    client.hmset(data.key, 'data', data.data, function(err, reply) {
       if(err) console.log(err)
        console.log(reply);
        const response = {
            statusCode: 200,
            body: JSON.stringify(reply)
        }
        client.quit();
        callback(null, response);
    });

}