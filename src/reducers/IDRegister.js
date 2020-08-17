import { ADD_ID } from '../actions/index';

const INITIAL_STATE = {
 id: 1,
};

const IDRegister = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ID:
      return {
        ...state,
        id: (state + 1),
      };
    default:
      return state;
  }
};

export default IDRegister;
