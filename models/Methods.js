//回傳傳入的時間是否大於現在時間
function compareTime(time) {
    var nowTime = new Date()
    nowTime = addHours(nowTime)
    time = new Date(time)
    console.log(`給定時間為 ${time.toISOString()}`)
    console.log(`現在時間為 ${nowTime.toISOString()}`)
    return nowTime <= time
}

//轉換time格式
function formatTime(timeString) {
    return timeString
    //return timeString.replace(/T/, ' ').replace(/Z/, '')
}

//將時間加8小時
function addHours(time) {
    let newDate = 0
    let newHours = time.getHours() + 8
    console.log(time)
    console.log(time.getHours())
    console.log(newHours)
    if (newHours > 23) {
        newHours = newHours - 24
        newDate = 1
    }
    time.setDate(time.getDate() + newDate)
    time.setHours(newHours)
    console.log(time)
    return time
}

//檢查url的middleware
function checkUrl(req, res, next) {
    var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (RegExp.test(req.body.url)) {
        next()
    }
    else {
        res.status(404).send('wrong url')
    }
}

//檢查時間格式的middleware
function checkTime(req, res, next) {
    let isValidDate = Date.parse(req.body.expireAt)
    if (isNaN(isValidDate)) {
        res.status(404).send('wrong time')
    }
    else {
        next()
    }
}

module.exports = {
    compareTime,
    addHours,
    formatTime,
    checkUrl,
    checkTime
}