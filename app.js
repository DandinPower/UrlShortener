require('dotenv/config')
const express = require('express')   //導入框架
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const app = express()  //宣告框架變數
const uploadUrl = require('./router/uploadUrl')
const redirectUrl = require('./router/redirectUrl')
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 限制5分鐘
    max: 10 // 限制請求數量
})

app.use(express.json())
app.use(cors())
app.use(limiter)
app.use('/api/v1/urls', uploadUrl)
app.use('/', redirectUrl)

app.listen(process.env.PORT, () => {        //伺服器運行的Function
    console.log(process.env.MYSQL_HOST)
    console.log(process.env.REDIS_HOST)
    console.log(`Server running at http://localhost:${process.env.PORT}`)  //運作提示字樣
})

module.exports = app
