let { assert, should } = require('chai')
const chaiHttp = require('chai-http')
const chai = require('chai')
const Methods = require('../models/Methods')

describe('MethodsTest', async () => {

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

    it("測試compareTime當現在時間小於指定時間", (done) => {
        let time = new Date('2023-02-17T18:55:00.000Z')
        assert.isTrue(Methods.compareTime(time))
        done()
    })

    it("測試compareTime當現在時間大於指定時間", (done) => {
        let time = new Date('2021-02-17T18:55:00.000Z')
        assert.isFalse(Methods.compareTime(time))
        done()
    })

    it("測試addHours", (done) => {
        let time = new Date('2021-02-17T18:55:00.000Z')
        assert.equal('2021-02-18T02:55:00.000Z', Methods.addHours(time).toISOString())
        time = new Date('2021-02-17T10:55:00.000Z')
        assert.equal('2021-02-17T19:55:00.000Z', Methods.addHours(time).toISOString())
        done()
    })

    it("測試formatTime", (done) => {
        let timeString = '2021-02-17T18:55:00.000Z'
        assert.equal('2021-02-17T18:55:00.000Z', Methods.formatTime(timeString))
        done()
    })

})