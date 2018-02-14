export const types = {
  getUserSuccess: 'GET_USER_SUCCESS',
  login: 'LOGIN',
  getUserInfo: 'GET_USER_INFO',
  logout: 'LOGOUT',
  resetPasswd: 'RESET_PASS_WD',
}

export function getUserSuccess(user) {
  return {
    type: types.getUserSuccess,
    payload: { user }
  }
}

export function login(params) {
  return {
    type: types.login,
    payload: { params }
  }
}

export function getUserInfo() {
  return {
    type: types.getUserInfo,
  }
}

export function logout() {
  return {
    type: types.logout,
  }
}

export function resetPasswd(params) {
  return {
    type: types.resetPasswd,
    payload: { params }
  }
}