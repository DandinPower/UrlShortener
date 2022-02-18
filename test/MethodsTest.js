let { assert, should } = require('chai')
const express = require('express')
const database = require('../database/index')
const axios = require('axios')
const app = require('../app')
const chaiHttp = require('chai-http')
const chai = require('chai')
const expect = require('chai').expect
const Url = require('../models/Url')
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

    it("測試formatTime", (done) => {
        let timeString = '2021-02-17T18:55:00.000Z'
        assert.equal('2021-02-17 18:55:00.000', Methods.formatTime(timeString))
        done()
    })

})