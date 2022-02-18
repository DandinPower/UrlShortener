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

    it("測試setOriginalUrl", (done) => {
        let url = new Url()
        let goodUrl = 'http://google.com'
        let badUrl = '123.com.tw'
        url.setOriginalUrl(goodUrl)
        assert.equal('undefined', url.getFail())
        assert.isTrue(url.getState())
        url.setOriginalUrl(badUrl)
        assert.equal('wrong url', url.getFail())
        assert.isFalse(url.getState())
        done()
    })

    it("測試setExpireAt", (done) => {
        let url = new Url()
        let goodTime = '2021-02-17T18:55:00.000Z'
        let badTime = '20222-12-33 33:12:1'
        url.setExpireAt(goodTime)
        assert.equal('undefined', url.getFail())
        assert.isTrue(url.getState())
        url.setExpireAt(badTime)
        assert.equal('wrong time', url.getFail())
        assert.isFalse(url.getState())
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
        time.setHours(time.getHours() + 8)
        assert.isTrue(new Date(goodTime).getTime() == time.getTime())
    })

})