import { types } from '@/store/actions/team';

const initialState = {
  list: []
};

export default function(state = initialState, { type, payload }) {
  switch(type) {
    case types.getTeamListSuccess:
      return {
        ...state,
        list: payload.list,
      };
    default:
      return state;
  }
};
