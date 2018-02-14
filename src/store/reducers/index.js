import { combineReducers } from 'redux';
import loading from './loading';
import global from './global';
import user from './user';
import team from './team';

const reducers = combineReducers({
  global,
  user,
  loading,
  team,
})

export default reducers;
