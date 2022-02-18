let { assert, should } = require('chai')
const express = require('express')
const database = require('../database/index')
const axios = require('axios')
const app = require('../app')
const chaiHttp = require('chai-http')
const chai = require('chai')
const expect = require('chai').expect
chai.use(chaiHttp)

describe('test', async () => {

    //初始化測試
    before(async () => {

    })

    //初始化每個測試
    beforeEach(async () => {

    });

    //關閉每個測試
    afterEach(async () => {

    })

    it("測試輸入錯誤的url_id", (done) => {
        chai.request(app)
            .get('/test')
            .end((err, res) => {
                assert(404, res.status)
                assert("can't find url", res.text)
                done();
            })
    })

    it("測試輸入過期的url_id", (done) => {

        chai.request(app)
            .get(`/1`)
            .end((err, res) => {
                assert(404, res.status)
                assert("expired", res.text)
                console.log(res.text)
                done()
            })
    })

    it("測試輸入正確的url_id", (done) => {

        chai.request(app)
            .get(`/2`)
            .end((err, res) => {
                assert(200, res.status)
                assert('http://google.com', res.redirects[0])
                done()
            })
    })

})