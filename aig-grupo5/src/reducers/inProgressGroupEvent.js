import { SAVE_TEMPORARY_EVENT, CLEAR_TEMPORARY_EVENT } from '../actions/index';

const INITIAL_STATE = [];

const inProgressGroupEvent = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_TEMPORARY_EVENT: return [action.obj];
    case CLEAR_TEMPORARY_EVENT: return INITIAL_STATE;
    default: return state;
  }
};

export default inProgressGroupEvent;