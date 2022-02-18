const express = require('express')
const database = require('../database/index')
const Methods = require('../models/Methods')

class Url {

    //constructor
    constructor() {
        this.originalUrl = null
        this.expireAt = null
        this.state = null
        this.id = null
        this.fail = 'undefined'
    }

    //設置originalUrl
    setOriginalUrl(value) {
        if (this.state == true | this.state == null) {
            var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            if (RegExp.test(value)) {
                this.originalUrl = value
                this.state = true
            }
            else {
                this.fail = "wrong url"
                this.state = false
            }
        }
    }

    //設置expireAt
    setExpireAt(value) {
        if (this.state == true | this.state == null) {
            let isValidDate = Date.parse(value)
            if (isNaN(isValidDate)) {
                this.fail = "wrong time"
                this.state = false
            }
            else {
                this.expireAt = value
                this.state = true
            }
        }
    }

    //設置id
    setId(value) {
        this.id = value
    }

    //取得originalUrl
    getOriginalUrl() {
        return this.originalUrl
    }

    //取得expireAt
    getExpireAt() {
        return this.expireAt
    }

    //取得state
    getState() {
        return this.state
    }

    //取得id
    getId() {
        return this.id
    }

    //取得錯誤訊息
    getFail() {
        return this.fail
    }

    //初始化參數
    async saveUrl() {
        if (this.state == false)
            return
        this.expireAt = Methods.formatTime(this.expireAt)
        let sql = `insert into url (originalUrl,expireAt) values("${this.originalUrl}","${this.expireAt}");`
        try {
            const result = await database.sqlConnection(sql)
            console.log(result)
            this.state = true
            this.id = result["insertId"]
            return
        } catch (err) {
            console.log(err)
            this.state = false
            return
        }
    }

    //根據id查找數據
    async findUrl() {
        const sql = `select originalUrl,expireAt from url where id = ${this.id};`
        try {
            const result = await database.sqlConnection(sql)
            console.log(result)
            if (result.length != 0) {
                this.state = true
                this.originalUrl = result[0].originalUrl
                this.expireAt = result[0].expireAt
                return
            }
            this.state = false
            return

        } catch (err) {
            console.log(err)
            this.state = false
            return
        }
    }
}

module.exports = Url 