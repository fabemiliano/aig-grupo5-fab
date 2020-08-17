import productList from '../services/productList';

const INITIAL_STATE = productList.map((e) => ({ id: e.id, amount: 0 }));

const CartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'INCREASE_CART': return state.map((e) => {
      if (e.id === Number(action.id)) return ({ id: e.id, amount: e.amount + 1 });
      return e;
    });
    case 'DECREASE_CART': return state.map((e) => {
      if (e.id === Number(action.id) && e.amount > 0) return ({ id: e.id, amount: e.amount - 1 });
      return e;
    });
    case 'SEND_TO_CART': return state.map((e) => {
      if (e.id === Number(action.id) && e.amount > 0) return ({ id: e.id, amount: 0 });
      return e;
    });
    case 'REMOVE_ITEM': return state.map((e) => {
      if (e.id === Number(action.id) && e.amount > 0) return ({ id: e.id, amount: 0 });
      return e;
    });
    default: return state;
  }
};

export default CartReducer;
