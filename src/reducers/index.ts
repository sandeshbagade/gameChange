import { History } from 'history';
import { combineReducers } from 'redux';
import { Auth } from '../model';
import * as authReducer from './auth';

export interface RootState {
  auth: Auth[];
}

export default (history: History) => {
  return combineReducers({
    auth: authReducer.auth,
  });
};
