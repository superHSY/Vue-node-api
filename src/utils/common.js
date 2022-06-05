/*
*eventStartTime： 开始时间
*eventEndTime：结束时间
*time： 服务器返回的当前时间
*/
// 倒计时
export function getTimes(eventStartTime, eventEndTime, time) {
        hour = '',
        minutes = '',
        seconds = '';
    var yms = anVar.currentTime.substring(0, 10),
        startTime = new Date(yms + " " + eventStartTime).getTime() / 1000,
        endTime = new Date(yms + " " + eventEndTime).getTime() / 1000,
        timeObj = {}

    // 还没开始
    if (time < startTime) {
        number = startTime - time;
        timeObj = self.getTimeNumber(number);
    } else if (time === startTime) {

    } else if (time === endTime) {

    } else if (time > startTime && time < endTime) {
        // 活动进行中
    } else if (time > endTime) {
        // 活动已经结束

    }
}
// 计算时间
export function getTimeNumber(number) {
    var hour = Math.floor(number / 3600), //小时
        minutes = Math.floor((number - hour * 3600) / 60),
        seconds = Math.floor(number - (hour * 3600 + minutes * 60));
    return {
        hour: hour,
        minutes: minutes,
        seconds: seconds
    }
}