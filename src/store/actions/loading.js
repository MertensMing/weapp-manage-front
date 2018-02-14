export const types = {
  showLoading: 'SHOW_LOADING',
  hideLoading: 'HIDE_LOADING'
}

export function showLoading(type) {
  return {
    type: types.showLoading,
    payload: { type }
  }
}

export function hideLoading(type) {
  return {
    type: types.hideLoading,
    payload: { type }
  }
}
