import axios from 'axios';
import md5 from 'js-md5';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

const timeout = 60000;
const baseURL =
  process.env.NODE_ENV === 'development'
    ? `${process.env.VUE_APP_BASE_API}`
    : `${process.env.VUE_APP_SERVER_PATH}${process.env.VUE_APP_BASE_API}`;
// NProgress Configuration
NProgress.configure({
  showSpinner: true
});
// create an axios instance
const instance = axios.create({
  timeout: timeout,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  },
  showErrorMessage: true, // 展示错误信息
  carrySessionToken: true, // params携带sessionToken
  baseURL: baseURL
});
// request interceptor
instance.interceptors.request.use(
  config => {
    //  NProgress.start();
    console.log('config', config);
    // do something before request is sent
    // 在一个ajax发送前执行一下取消操作
    cancelRequest(config);
    config.cancelToken = new axios.CancelToken(c => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      requestList.push({
        u: config.url + '&' + config.method,
        f: c
      });
    });

    // if (config.carrySessionToken) {
    //   config.params = Object.assign({}, config.params, {
    //     //   sessionToken: store.getters.sessiontoken
    //   });
    // }
    return config;
  },
  error => {
    // do something with request error
    // for debug
    console.log(error);
    return Promise.reject(error);
  }
);
// response interceptor
instance.interceptors.response.use(
  response => {
    NProgress.done();
    console.log('response============', response);
    if (response.data) {
      const res = response.data;
      // 打印日志
      log(response);

      // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从requestList中移除
      cancelRequest(response.config);

      if (res.status !== 'success') {
        // 错误状态
        const message = res.message || {};

        if (['1', '12'].includes(message.code)) {
          // sessionToken过期/错误/无效, 需要重新登录
          /* MessageBox.confirm(message.info || '用户会话令牌已过期', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
          roundButton: true,
          showClose: false,
          showCancelButton: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          store.dispatch('user/resetUserInfo').then(() => {
            location.reload();
          });
        });*/
          // Message({
          //   message: message.info || '用户会话令牌已过期',
          //   type: 'error',
          //   duration: 3000
          // });
          return Promise.reject(message);
        } else {
          // 其他异常错误
          response.config.showErrorMessage &&
            Message({
              message: message.info || 'Error',
              type: 'error',
              duration: 5000,
              showClose: true
            });
        }
        return Promise.reject(message);
      } else {
        // 成功状态
        if (res.noAccessible)
        // 不可访问的字段集合,因为后端不能加到data内层,暂由前端处理放到data内层
        { res.data.noAccessible = res.noAccessible; }
        return Promise.resolve(res.rpdata || res.data || res);
      }
    } else {
      return Promise.resolve(response);
    }
  },
  error => {
    if (error && error.__CANCEL__) return;
    //   console.error(error.info, "======", error.message, "============", error);
    let text = '';
    if (error.message === 'timeout of 60000ms exceeded') {
      text = '服务器连接超时，请稍后再试。';
    } else if (
      error.message === 'Request failed with status code 500' ||
      error.message === 'Request failed with status code 404'
    ) {
      text = '服务器连接异常，请稍后再试。';
    } else {
      text = error.info || error.message || error;
    }
    Message({
      message: text,
      type: 'error',
      duration: 3000
    });
    return Promise.reject(error);
  }
);
// log
function log(response) {
  // 开启DEBUG打印http请求日志
  if (process.env.NODE_ENV === 'development') {
    if (response.config) {
      console.groupCollapsed(
        `Ajax请求加载完毕 (${response.config.url} - ${response.config.method} - ${response.status})`
      );
      console.log('AjaxURL     :', response.config.url);
      console.log('SearchParams:', {
        ...response.config.params
      });
      // console.log('Request     :', JSON.parse(response.config.data || '{}'));
      console.log('Request     :', response.config.data || '{}');
      console.log('Response    :', response.data);
      console.groupEnd();
    }
  }
}
// 统一处理取消重复请求
// 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const requestList = [];

function cancelRequest(config) {
  for (const r in requestList) {
    // 当当前请求在数组中存在时执行函数体
    if (
      requestList[r].u ===
      md5(`${config.url}&${config.method}&${JSON.stringify(config.data)}`)
    ) {
      // 执行取消操作
      requestList[r].f();
      // 把这条记录从数组中移除
      requestList.splice(r, 1);
    }
  }
}
/**
 * 封装get请求
 * @param {*} durl
 * @param {*} val
 */
const dGet = function(durl, val) {
  return new Promise((resolve, reject) => {
    // request.get(durl, val)
    instance
      .get(durl, { params: val })
      .then(function(response) {
        resolve(response);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
/**
 * 封装post请求
 * @param {*} durl
 * @param {*} val
 */
const dPost = function(durl, val, type) {
  return new Promise((resolve, reject) => {
    instance
      .post(durl, val, type)
      .then(function(response) {
        resolve(response);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};
/**
 * 下载
 * @param {*} durl
 * @param {*} val
 */
const dDownload = function(durl, val) {
  return new Promise((resolve, reject) => {
    instance
      .post(durl, val)
      .then(function(response) {
        resolve(response);
      })
      .catch(function(err) {
        console.log('Post错误：', err);
        reject(err);
      });
  });
};
export { dDownload, dGet, dPost, axios };
