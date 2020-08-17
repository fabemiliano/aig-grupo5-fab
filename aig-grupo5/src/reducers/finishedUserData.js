import { SAVE_USER_DATA } from '../actions/index';

const INITIAL_STATE = [];

const finishedUserData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_USER_DATA: return [...state, action.obj];
    default: return state;
  }
};

export default finishedUserData;
