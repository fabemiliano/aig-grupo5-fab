import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk),
));


export const updateLocalStorage = () => {
  const cartReducer = { cart: store.getState().FinalCartReducer };
  localStorage.setItem('temporaryStorage', JSON.stringify([cartReducer]));
};

export const purchaseFinished = () => {
  const storage = JSON.parse(localStorage.getItem('temporaryStorage'));
  localStorage.setItem('temporaryStorage', JSON.stringify([{ cart: [] }]));
  if (storage === null) { localStorage.setItem('temporaryStorage', JSON.stringify([{ cart: [] }])); }
  let id = JSON.parse(localStorage.getItem('userID'));
  if (id === '' || id === undefined) {
    localStorage.setItem('userID', 0);
  } else {
    id += 1;
    localStorage.setItem('userID', id);
  }
  const purchaseId = JSON.parse(localStorage.getItem('userID'));
  const buyerId = JSON.parse(localStorage.getItem('user')).log;
  const cartReducer = { id_compra: purchaseId, buyerId, cart: store.getState().FinalCartReducer, pack: store.getState().PackageReducer, collection: store.getState().CollectionReducer };
  let cartLocalStorage = JSON.parse(localStorage.getItem('purchaseFineshed'));
  if (cartLocalStorage === '' || !cartLocalStorage) {
    localStorage.setItem('purchaseFineshed', JSON.stringify([cartReducer]));
  } else {
    cartLocalStorage = cartLocalStorage.filter((e) => e.id_compra !== purchaseId);
    localStorage.setItem('purchaseFineshed', JSON.stringify([...cartLocalStorage, cartReducer]));
  }
};

export default store;
