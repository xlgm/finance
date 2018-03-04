/*
* 工具方法
*/

//判断某个元元素在数组中
function isInArray(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      return true;
    }
  }
  return false;
}
//判断某个元素 在字符串中
function isInString(str, value) {
  if (str.indexOf(value) >= 0) {
    return true;
  }
  return false;
}

/**
* @author William Cui
* @description 数字不够位数前面自动补零
* @param number {number} 需要格式化的数字
* @param n {number} 需要格式化成的位数
**/
function fillZero(number, n) {
  return (Array(n).join(0) + number).slice(-n);
}

/**
* @author William Cui
* @description 根据后端返回的时间戳格式化成指定的格式
* @param timestamp {number} 需要格式化的时间戳
* @param patternStr {string} 指定的格式字符串 默认是'YYYY-MM-DD hh:mm:ss'
Y: 代表年份， M: 代表月份， D: 代表一个月中的第几天， h: 代表小时， m: 代表分, s: 代表秒
**/
function formatDate(timestamp, patternStr) {
  patternStr = patternStr || 'YYYY-MM-DD hh:mm:ss';
  var patternArray = patternStr.match(/\w+/g);
  var date = new Date(timestamp);
  var dateObj = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };
  patternArray.forEach(pattern => {
    let replaceStr = fillZero(dateObj[pattern[0]], pattern.length);
    patternStr = patternStr.replace(pattern, replaceStr);
  });
  return patternStr;
}

/**
* @author William Cui
* @description 把日期字符串转成时间戳
* @param dateStr {string} 需要格式化的日期字符串
**/
function formatStamp(dateStr) {
  return new Date(dateStr).getTime();
}

export { isInArray, isInString, fillZero, formatDate, formatStamp };
