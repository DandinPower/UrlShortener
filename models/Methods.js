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

module.exports = {
    compareTime,
    addHours,
    formatTime
}