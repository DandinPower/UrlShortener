let { assert, should } = require('chai')
const chaiHttp = require('chai-http')
const chai = require('chai')
const Url = require('../models/Url')

describe('UrlTest', async () => {

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

    it("測試Constructor", (done) => {
        let url = new Url()
        assert.isNull(url.getOriginalUrl())
        assert.isNull(url.getExpireAt())
        assert.isNull(url.getState())
        assert.isNull(url.getId())
        assert('undefined', url.getFail())
        done()
    })

    it("測試saveUrl", async () => {
        let url = new Url()
        let goodTime = '2021-02-17T18:55:00.000Z'
        let goodUrl = 'http://google.com'
        url.setExpireAt(goodTime)
        url.setOriginalUrl(goodUrl)
        await url.saveUrl()
        assert.isTrue(url.getState())
        assert.isNumber(url.getId())
    })

    it("測試findUrl", async () => {
        let url = new Url()
        let goodTime = '2021-02-17T18:55:00.000Z'
        let goodUrl = 'http://google.com'
        url.setExpireAt(goodTime)
        url.setOriginalUrl(goodUrl)
        await url.saveUrl()
        let id = url.getId()
        let newUrl = new Url()
        newUrl.setId(id)
        await url.findUrl()
        assert.isTrue(url.getState())
        assert.equal(goodUrl, url.getOriginalUrl())
        let time = url.getExpireAt()
        assert.isTrue(goodTime == time)
    })

})