const INITIAL_STATE = { isDelivery: false };
const CollectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SELECT_DELIVERY': return { isDelivery: true };
    case 'SELECT_COLLECT': return { isDelivery: false };
    default: return state;
  }
};

export default CollectionReducer;
