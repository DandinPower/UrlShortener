const express = require('express')
const router = express.Router()
const Url = require('../models/Url')

router.post('/', async (req, res, next) => {
    var originalUrl = req.body.url
    var expireAt = req.body.expireAt
    var url = new Url()

    url.setOriginalUrl(originalUrl)

    url.setExpireAt(expireAt)

    await url.saveUrl()

    if (url.getState()) {
        res.status(200).json({
            "id": url.getId(),
            "shortUrl": `http://localhost:5000/${url.getId()}`
        })
    }
    else {
        res.status(404).send(url.getFail())
    }

})

module.exports = router 