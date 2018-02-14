import { put, call } from 'redux-saga/effects';
import * as teamApi from '@/store/api/team';
import { types } from '@/store/actions/team';
import { showLoading, hideLoading } from '@/utils/loading';
import { message } from 'antd';
import { history } from '@/router';
import { setAuthority } from '@/utils/authority';

export function* getTeamList() {
  yield showLoading(types.getTeamList);
  try {
    const { list } = yield call(teamApi.getList);
    yield put({ type: types.getTeamListSuccess, payload: { list } });
  } catch (e) {
    message.error(e.message);
  }
  yield hideLoading(types.getTeamList);
}

