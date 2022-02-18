const express = require('express')
const router = express.Router()
const Url = require('../models/Url')

function compareTime(time) {
    var nowTime = new Date(Date.now())
    return nowTime <= time
}

router.get('/:url_id', async (req, res, next) => {
    var url_id = req.params.url_id
    console.log(url_id)
    var url = new Url(url_id)
    url.setId(url_id)
    await url.findUrl()

    if (url.getState()) {
        if (compareTime(url.getExpireAt())) {
            res.redirect(302, url.getOriginalUrl())
            return
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