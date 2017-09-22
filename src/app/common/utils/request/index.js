import axios from 'axios';
import jsonp from 'jsonp';
import queryString from 'query-string';

const method = ['post', 'get', 'put', 'delete', 'jsonp'];
const ins = {};

method.forEach(function (method) {
  ins[method] = function (url, data, option) {
    option = (option || {});

    let postData = data;
    let params = data;

    if (method === 'get') {
      postData = Object.assign(data || {}, { _csrf: window._csrf });
    }

    if (method !== 'get') {
      postData = Object.assign(data || {}, { _csrf: window._csrf });
    }

    if (method === 'jsonp') {
      return new Promise((resolve, reject) => {
        jsonp(`${url}?${queryString.stringify(postData || {})}`, null, (err, data) => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        });
      });
    }
    
    const obj = Object.assign({
      method,
      params,
      data: postData,
      url: url
    }, option);

    return axios(obj)
      .then((res) => {
        if (res.data.code === 0) {
          return Promise.resolve(res.data.data);
        } else {
          return Promise.resolve(res.data);
        }
      })
      .catch(function () {
        return Promise.reject('网络错误');
      });
  };
});

export default ins;
