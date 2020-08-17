const INITIAL_STATE = [{ id: 1, total: '' }, { id: 2, total: '' }, { id: 3, total: '' }];
const PackageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT': return state.map((e) => {
      if (e.id === action.id) return { id: e.id, total: Number(action.total) };
      return e;
    });
    case 'FINISH_SHOPPING': return INITIAL_STATE;
    default: return state;
  }
};

export default PackageReducer;
