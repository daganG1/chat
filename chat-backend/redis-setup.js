const redis = require('redis');

const client = redis.createClient({host: process.env.REDIS_HOST,
port:process.env.REDIS_PORT,
password: process.env.REDIS_PASSWORD
});

client.on("error", function(error) {
    console.error("can't connect to redis");
  });



module.exports.getValue = function(from_currency_code){
             return new Promise((resolve,reject) => {
                client.get(from_currency_code, (err, exchange_rates) => {
                    console.log(exchange_rates)
                     resolve(exchange_rates || null)
         })})
}

module.exports.setKeyValue = (key,value,timeToCache) => {
    client.setex(key,timeToCache,value);
}

module.exports.client = client;