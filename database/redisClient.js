require('dotenv/config')
const redis = require('redis')
const redisUrl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
const config = {
    url: redisUrl
}
const redisClient = redis.createClient(config)
redisClient.connect()
redisClient.on('connect', () => console.log('Connected to redis server'))

//透過key取得json
async function getHash(key) {
    const result = await redisClient.hGetAll(key)
    let value = {
        "originalUrl": result.originalUrl,
        "expireAt": new Date(result.expireAt)
    }
    if (value.originalUrl == undefined)
        value = null
    return value
}

//設置hash,value為json
async function setHash(key, value) {
    await redisClient.HSET(key, 'originalUrl', value.originalUrl)
    await redisClient.HSET(key, 'expireAt', value.expireAt.toISOString())
}

module.exports = {
    getHash,
    setHash
}