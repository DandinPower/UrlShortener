require('dotenv/config')
const express = require('express')
const router = express.Router()
const Url = require('../models/Url')
const Methods = require('../models/Methods')

//給定url以及過期時間來取得其對應的短網址
router.post('/', Methods.checkUrl, Methods.checkTime, async (req, res, next) => {
    var originalUrl = req.body.url
    var expireAt = req.body.expireAt
    var url = new Url()
    url.setOriginalUrl(originalUrl)
    url.setExpireAt(expireAt)
    await url.saveUrl()
    if (url.getState()) {
        res.status(200).json({
            "id": url.getId(),
            "shortUrl": `http://localhost:${process.env.PORT}/${url.getId()}`
        })
    }
    else {
        res.status(404).send(url.getFail())
    }

})

module.exports = router 