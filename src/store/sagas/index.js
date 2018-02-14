import { takeEvery, all } from 'redux-saga/effects';
import { types as userTypes } from '@/store/actions/user';
import { types as teamTypes } from '@/store/actions/team';
import * as userSagas from './user';
import * as teamSagas from './team';

export default function* rootSaga() {
  yield all([
    takeEvery(userTypes.login, userSagas.login),
    takeEvery(userTypes.logout, userSagas.logout),
    takeEvery(userTypes.getUserInfo, userSagas.getUserInfo),
    takeEvery(userTypes.resetPasswd, userSagas.resetPasswd),
    takeEvery(teamTypes.getTeamList, teamSagas.getTeamList),
  ])
}
