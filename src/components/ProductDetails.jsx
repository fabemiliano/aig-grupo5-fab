import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import productList from '../services/productList';
import { decrease, increase, sendToCart } from '../actions/index';
import { getTotalCart } from './ProductsPage';
import '../CSS/ProductDetails.css';
import '../CSS/Footer.css';
import cart from '../images/cart.svg';
import BackToProductsList from './BackToProductsList';
import { updateLocalStorage } from '../store';
import user from '../images/user.svg';
import logo from '../images/logo.svg';

function renderIncrementButton(id, props) {
  const {
    initialState, decrement, increment, addToCart, detailsInitialState,
  } = props;
  let total;
  if (initialState.some((e) => e.id === Number(id))) {
    total = initialState.filter((e) => e.id === Number(id))[0].total;
  } else { total = 0; }
  const detailsTotal = detailsInitialState.filter((e) => e.id === Number(id))[0].amount;
  return (
    <div className="add-to-cart">
      <div className="increment-div">
        <p>{`Você possui ${total} unidades desse produto em seu carrinho`}</p>
        <div className="increment-buttons">
          <button type="button" onClick={() => decrement(id)}>-</button>
          <p>{detailsTotal}</p>
          <button type="button" onClick={() => increment(id)}>+</button>
        </div>
      </div>
      <button type="button" onClick={() => { addToCart(Number(id), detailsTotal); updateLocalStorage(); }} disabled={!((detailsTotal > 0))}>Adicionar ao Carrinho</button>
    </div>
  );
}

function ProductDetails(props) {
  const { props: { match: { params: { id } } } } = props;
  const cartState = (JSON.parse(localStorage.getItem('temporaryStorage')))[0].cart;
  const product = productList.filter((e) => e.id === Number(id));
  return (
    <div>
      <div>
        <div className="products-page-nav">
          <Link to="/mainPurchase"><img src={logo} alt="" width="100px" /></Link>
          <div className="cart-img">
            <p>{getTotalCart(cartState)}</p>
            <Link to="/cart"><img src={cart} alt="cart" width="30px" /></Link>
          </div>
        </div>
        <div className="container">
          <div className="products-list">
            <img src={product[0].thumbnail} width="300px" alt="" />
            <h3>{product[0].productName}</h3>
            <p>{`${product[0].package_volume}L`}</p>
            <p>{`R$ ${product[0].originalPrice}`}</p>
            <p>Com a embalagem retornável você paga:</p>
            <p>{`R$ ${product[0].discountPrice}`}</p>
          </div>
          {renderIncrementButton(id, props)}
        </div>
      </div>
      <div className="footer">
        <BackToProductsList />
        <Link to="/Perfil"><img src={user} alt="" width="30px" /></Link>
      </div>
    </div>
  );
}

const mapStateToPros = (state) => ({
  initialState: state.FinalCartReducer,
  detailsInitialState: state.CartReducer,
  cartState: state.FinalCartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  decrement: (id) => dispatch(decrease(id)),
  increment: (id) => dispatch(increase(id)),
  addToCart: (id, total) => dispatch(sendToCart(id, total)),
});

export default connect(mapStateToPros, mapDispatchToProps)(ProductDetails);
