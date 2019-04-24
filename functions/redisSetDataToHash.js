const redis = require('redis');

module.exports.redisSetDataToHash = (event, context, callback) => {
   const client = redis.createClient({ url: 'redis://redisk.fsgenx.ng.0001.euc1.cache.amazonaws.com:6379' });
   const data = JSON.parse(event.body);
    client.hset(data.hash, data.key, JSON.stringify(data), function(err, reply) {
       if(err) console.log(err)
        console.log(reply);
        const response = {
            statusCode: 200,
            body: JSON.stringify({hash: data.hash, data: data})
        }
        client.quit();
        callback(null, response);
    });

}
