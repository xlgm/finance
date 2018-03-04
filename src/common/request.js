import { browserHistory } from 'react-router';

/**
* @author William Cui
* @description 使用Promise封装接口请求方法
* @param url {string} 请求地址 【必填】
* @param method {string} 请求方式 【必填】
* @param headers {object} 请求头对象 【选填】
* @param data {object} 请求参数对象 【选填】
* @return Promise 对象
* @date 2017-08-25
**/
function request({ url, method, headers, data }) {

  //键值对转换为字符串
  function params(data) {
    var arr = [];
    Object.keys(data).forEach((key, index) => {
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    });
    return arr.join('&');
  }

  return new Promise((resolve, reject) => {
    let formable = (method.toUpperCase() === 'GET') || (method.toUpperCase() === 'DELETE');
    if (formable && data) {
      url = url + '?' + params(data);
    }


    let body;
    if (!formable && data) {
      if (headers && headers['Content-Type'] && headers['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1) {
        body = params(data);
      } else {
        body = data;
      }
    }


    fetch(url, {
      method,
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        ...headers
      },
      body
    }).then((response) => {
      if (response.ok) {
        return response.status === 200 ? response.json() : { status: response.status };
      }
      switch (response.status) {
        case 0:
          reject({
            status: response.status,
            msg: '未连接网络'
          });
          break;
        case 401:
          browserHistory.push('/login');
          reject({
            status: response.status,
            msg: '商家编码、用户名或密码错误'
          });
          break;
        case 500:
          reject({
            status: response.status,
            msg: '服务器内部错误 [500].'
          });
          break;
        default:
          reject({
            status: response.status,
            msg: response.statusText
          })
      }
    }).then(json => {
      resolve(json);
    }).catch(e => {
      console.log('fetchjson: ', e);
    });
  });
}

export default request;