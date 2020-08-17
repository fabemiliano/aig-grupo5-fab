import {
  EVENT_CHOOSED,
} from '../actions';

const INITIAL_STATE = {
  event: {},
};

const eventReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENT_CHOOSED:
      return {
        ...state,
        event: action.event,
      };
    default:
      return state;
  }
};

export default eventReducer;