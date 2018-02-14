import { types } from '@/store/actions/loading';

const initialState = {
  global: false,
};

export default function(state = initialState, { type, payload }) {
  switch(type) {
    case types.showLoading:
      return {
        ...state,
        [payload.type]: true,
      };
    case types.hideLoading:
      return {
        ...state,
        [payload.type]: false,
      };
    default:
      return state;
  }
};
