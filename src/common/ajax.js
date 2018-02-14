import axios from 'axios';

const ajax = axios.create({
  baseURL: process.env.NODE_ENV === 'dev' ? '' : 'https://usoccer.cn',
  timeout: 5000,
});

ajax.interceptors.response.use(function(res){
  const { data } = res;
  if (+data.code === 0 || +data.code === 200) {
    return data.data;
  }
  return Promise.reject(data);
}, function(err){
  if (!err.message) {
    err.message = '网络错误';
  }
  return Promise.reject(err);
});

export default ajax;
