let { assert, should } = require('chai')
const express = require('express')
const database = require('../database/index')
const axios = require('axios')
const app = require('../app')
const chaiHttp = require('chai-http')
const chai = require('chai')
const expect = require('chai').expect

describe('uploadUrlTest', async () => {

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

    it("測試輸入錯誤的Url格式", (done) => {
        chai.request(app)
            .post('/api/v1/urls')
            .set('content-type', 'application/json')
            .send({ url: 'test', expireAt: '2022-02-18T02:55:00.000Z' })
            .end((err, res) => {
                assert(404, res.status)
                assert('wrong url', res.text)
                done();
            })
    })

    it("測試輸入錯誤的expireAt格式", (done) => {
        chai.request(app)
            .post('/api/v1/urls')
            .set('content-type', 'application/json')
            .send({ url: 'http://google.com', expireAt: 'test' })
            .end((err, res) => {
                assert(404, res.status)
                assert('wrong time', res.text)
                done();
            })
    })

    it("測試輸入正確的格式", (done) => {
        chai.request(app)
            .post('/api/v1/urls')
            .set('content-type', 'application/json')
            .send({ url: 'http://google.com', expireAt: '2022-02-18T02:55:00.000Z' })
            .end((err, res) => {
                assert(200, res.status)
                expect(res.body.id).to.be.an('number')
                const RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
                assert(RegExp.test(res.body.shortUrl), true)
                done();
            })
    })
})