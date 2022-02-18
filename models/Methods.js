//回傳傳入的時間是否大於現在時間
function compareTime(time) {
    var nowTime = new Date(Date.now())
    return nowTime <= time
}

//轉換time格式
function formatTime(timeString) {
    return timeString.replace(/T/, ' ').replace(/Z/, '')
}

module.exports = {
    compareTime,
    formatTime
}