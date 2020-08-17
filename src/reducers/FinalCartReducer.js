const INITIAL_STATE = [];

const FinalCartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SEND_TO_CART': if (action.total !== 0) {
      if (state.some((e) => e.id === action.id)) {
        return state.map((e) => {
          if (e.id === action.id) return { id: e.id, total: e.total + action.total, pack: '' };
          return e;
        });
      }
      return [...state, { id: action.id, total: action.total, pack: '' }];
    } return state;
    case 'MODIFY_PACKAGE': return state.map((e) => {
      if (e.id === action.id) {
        console.log(action.e);
        return { id: e.id, total: e.total, pack: action.e };
      }
      return e;
    });
    case 'INCREASE_FINAL_CART': return state.map((e) => {
      if (e.id === action.id) return { id: e.id, total: e.total + 1, pack: e.pack };
      return e;
    });
    case 'DECREASE_FINAL_CART': return state.map((e) => {
      if (e.id === action.id && e.total > 0) return { id: e.id, total: e.total - 1, pack: e.pack };
      return e;
    });
    case 'REMOVE_ITEM': return state.filter((e) => e.id !== action.id);
    case 'FINISH_SHOPPING': return INITIAL_STATE;
    default: return state;
  }
};

export default FinalCartReducer;
