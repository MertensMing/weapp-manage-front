import ajax from '@/common/ajax';

export function login(params) {
  return ajax.post('/api/user/login', params);
}

export function getUserInfo() {
  return ajax.get('/api/user');
}

export function logout() {
  return ajax.post('/api/user/logout');
}

export function resetPasswd(params) {
  return ajax.post('/api/user/resetPasswd', params);
}