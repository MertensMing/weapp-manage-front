import { types } from '@/store/actions/user';

const initialState = {
  info: null
};

export default function(state = initialState, { type, payload }) {
  switch(type) {
    case types.getUserSuccess:
      return {
        ...state,
        info: payload.user,
      };
    default:
      return state;
  }
};
