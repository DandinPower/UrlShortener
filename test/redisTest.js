let { assert, should } = require('chai')
const chaiHttp = require('chai-http')
const chai = require('chai')
const Url = require('../models/Url')
const Redis = require('../database/redisClient')
describe('RedisTest', async () => {

    //初始化測試
    before(async () => {
        chai.use(chaiHttp)
    })

    //初始化每個測試
    beforeEach(async () => {

    });

    //關閉每個測試
    afterEach(async () => {

    })

    it("測試setHash", async () => {
        let key = 'testSetHash'
        let value = {
            "originalUrl": "http://test.com",
            "expireAt": new Date("2021-02-17T10:55:00.000Z")
        }
        await Redis.setHash(key, value)
    })

    it("測試getHash", async () => {
        let key = 'testSetHash'
        const result = await Redis.getHash(key)
        console.log(result)
        assert.isNotNull(result)
        key = 'testSetHash2'
        let result2 = await Redis.getHash(key)
        console.log(result2)
        assert.isNull(result2)
    })
})