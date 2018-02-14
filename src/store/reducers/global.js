import { types } from '@/store/actions/global'

const initialState = {
  collapsed: false
};

export default function(state = initialState, { type, payload }) {
  switch(type) {
    case types.toggleCollapsed:
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    default:
      return state;
  }
};
