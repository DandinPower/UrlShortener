const redis = require('redis')
const redisClient = redis.createClient({ host: process.env.REDIS_ENDPOINT, legacyMode: true })
redisClient.connect()

//透過key取得json
async function getHash(key) {
    return new Promise((resolve, reject) => {
        redisClient.hGetAll(key, (err, res) => {
            if (err) {
                reject(err)
            } else {
                if (res.length != 0) {
                    let value = {
                        "originalUrl": res[1],
                        "expireAt": new Date(res[3])
                    }
                    resolve(value)
                }
                else {
                    resolve(null)
                }
            }
        })
    })
}

//設置hash,value為json
async function setHash(key, value) {
    await redisClient.hSet(key, 'originalUrl', value.originalUrl)
    await redisClient.hSet(key, 'expireAt', value.expireAt.toISOString())
}

module.exports = {
    getHash,
    setHash
}