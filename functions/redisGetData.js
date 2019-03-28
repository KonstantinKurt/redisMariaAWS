const redis = require('redis');

module.exports.redisGetData = (event, context, callback) => {
    const client = redis.createClient({ url: 'redis://redisk.fsgenx.ng.0001.euc1.cache.amazonaws.com:6379' });
    client.keys('*', function(err, keys) {
        err ? console.log(err) : null;
        const promises = keys.map(key => new Promise((resolve, reject) => {
            client.hgetall(key, (err, result) => {
                err ? reject(err) : null;
                resolve(result);
            });
        }));
        Promise
            .all(promises)
        .then(arr => {
                const response = {
                    statusCode: 200,
                    body: JSON.stringify(arr)
                }
                client.quit();
                callback(null, response);

            })
    .catch(err => console.log(err))
    });

}