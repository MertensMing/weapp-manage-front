import { put, call } from 'redux-saga/effects';
import * as userApi from '@/store/api/user';
import { types } from '@/store/actions/user';
import { showLoading, hideLoading } from '@/utils/loading';
import { message } from 'antd';
import { history } from '@/router';
import { setAuthority } from '@/utils/authority';

export function* login({ payload }) {
  yield showLoading(types.login);
  try {
    const user = yield call(userApi.login, payload.params);
    setAuthority(['admin']);
    yield put({ type: types.getUserSuccess, payload: { user } });
    yield call(history.push, '/');
  } catch (e) {
    message.error(e.message);
  }
  yield hideLoading(types.login);
}

export function* logout() {
  yield showLoading(types.logout);
  try {
    const user = yield call(userApi.logout);
    yield put({ type: types.getUserSuccess, payload: { user } });
    setAuthority('guest');
    yield call(history.push, '/user/login');
  } catch (e) {
    message.error(e.message);
  }
  yield hideLoading(types.logout);
}

export function* getUserInfo() {
  yield showLoading(types.getUserInfo);
  try {
    const user = yield call(userApi.getUserInfo);
    yield put({ type: types.getUserSuccess, payload: { user } });
  } catch (e) {
    message.error(e.message);
    setAuthority('guest');
    yield call(history.push, '/user/login');
  }
  yield hideLoading(types.getUserInfo);
}

export function* resetPasswd({ payload }) {
  yield showLoading(types.resetPasswd);
  try {
    yield call(userApi.resetPasswd, payload.params);
    message.success('重置密码的邮件已发送到你的邮箱，请登录查看');
  } catch (e) {
    message.error(e.message);
  }
  yield hideLoading(types.resetPasswd); 
}
