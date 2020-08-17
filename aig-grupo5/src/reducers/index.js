import { combineReducers } from 'redux';
import finishedUserData from './finishedUserData';
import inProgressRegister from './inProgressRegister';
import inProgressGroupEvent from './inProgressGroupEvent';

const rootReducer = combineReducers({
  finishedUserData,
  inProgressRegister,
  inProgressGroupEvent,
});

export default rootReducer;
