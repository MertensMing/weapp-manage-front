const initialState = {
  selected: [],
  open: []
}
const menu = (state = initialState, action) => {
  if (action.type ==='SELECT_DEFAULT_MENU') {
    return Object.assign({}, {
      selected: action.payload.selected,
      open: action.payload.open,
    })
  }
  return state
}

export default {
  menu
}
