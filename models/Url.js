const express = require('express')
const database = require('../database/index')
const Methods = require('../models/Methods')
const Redis = require('../database/redisClient')
require('dotenv/config')

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
        this.originalUrl = value
    }

    //設置expireAt
    setExpireAt(value) {
        this.expireAt = value
    }

    //設置正確的狀態
    setAll(value) {
        this.state = true
        this.originalUrl = value.originalUrl
        this.expireAt = value.expireAt
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
        const value = await Redis.getHash(this.id)
        this.state = false
        if (value != null) {
            this.setAll(value)
        }
        else {
            try {
                const result = await database.sqlConnection(sql)
                console.log(result)
                if (result.length != 0) {
                    let value = {
                        "originalUrl": result[0].originalUrl,
                        "expireAt": result[0].expireAt
                    }
                    await Redis.setHash(this.id, value)
                    this.setAll(value)
                }
            } catch (err) {
                console.log(err)
            }
        }

    }
}

module.exports = Url 