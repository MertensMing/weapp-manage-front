export const types = {
  getTeamListSuccess: 'GET_TEAM_LIST_SUCCESS',
  getTeamList: 'GET_TEAM_LIST',
}

export function getTeamListSuccess(list) {
  return {
    type: types.getTeamListSuccess,
    payload: { list }
  }
}

export function getTeamList() {
  return {
    type: types.getTeamList,
  }
}
