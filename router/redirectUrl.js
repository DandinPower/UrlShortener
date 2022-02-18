const express = require('express')
const router = express.Router()
const Url = require('../models/Url')
const Methods = require('../models/Methods')

//根據給定的短網址回傳原始的url
router.get('/:url_id', async (req, res, next) => {
    var url_id = req.params.url_id
    var url = new Url(url_id)
    url.setId(url_id)
    await url.findUrl()
    if (url.getState()) {
        if (Methods.compareTime(url.getExpireAt())) {
            res.redirect(302, url.getOriginalUrl())
        }
        else {
            res.status(404).send("expired")
        }
    }
    else {
        res.status(404).send("can't find url")
    }
})

module.exports = router 